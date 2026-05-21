import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { Checkin } from '../../entities/checkin.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Checkin)
    private checkinRepository: Repository<Checkin>,
  ) {}

  async getTasksByDate(userId: number, date: string): Promise<any[]> {
    const tasks = await this.taskRepository.find({
      where: { userId, plannedDate: date },
      order: { level: 'ASC', createdAt: 'ASC' },
    });
    return this.buildTree(tasks);
  }

  async getAllTasks(userId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { userId },
      order: { level: 'ASC', createdAt: 'ASC' },
    });
  }

  async createTask(userId: number, dto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.userId = userId;
    task.name = dto.name;
    task.description = dto.description || '';
    task.level = dto.level;
    task.estimatedMinutes = dto.estimatedMinutes || 0;
    task.plannedDate = dto.plannedDate;
    task.status = 'pending';

    if (dto.parentId) {
      const parent = await this.taskRepository.findOne({ where: { id: dto.parentId, userId } });
      if (!parent) {
        throw new NotFoundException('父任务不存在');
      }
      if (parent.level >= dto.level) {
        throw new BadRequestException('子任务层级必须大于父任务');
      }
      task.parentId = dto.parentId;
      task.plannedDate = parent.plannedDate;
    }

    const saved = await this.taskRepository.save(task);

    // 如果父任务有子任务，将父任务耗时置零
    if (task.parentId) {
      await this.taskRepository.update(task.parentId, { estimatedMinutes: 0 });
    }

    return saved;
  }

  async updateTask(userId: number, id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException('任务不存在');
    }

    // 防止循环引用
    if (dto.parentId !== undefined && dto.parentId !== null) {
      if (dto.parentId === id) {
        throw new BadRequestException('不能选择自己作为父任务');
      }
      const descendants = await this.getDescendantIds(id);
      if (descendants.includes(dto.parentId)) {
        throw new BadRequestException('不能选择子任务作为父任务');
      }
      const newParent = await this.taskRepository.findOne({ where: { id: dto.parentId, userId } });
      if (!newParent) {
        throw new NotFoundException('父任务不存在');
      }
      if (newParent.level >= task.level) {
        throw new BadRequestException('子任务层级必须大于父任务');
      }
    }

    Object.assign(task, dto);
    const saved = await this.taskRepository.save(task);

    // 如果父任务有子任务，将父任务耗时置零
    if (task.parentId) {
      await this.taskRepository.update(task.parentId, { estimatedMinutes: 0 });
    }

    return saved;
  }

  async deleteTask(userId: number, id: number): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException('任务不存在');
    }

    const descendants = await this.getDescendantIds(id);
    const allIds = [id, ...descendants];

    // 删除关联的打卡记录
    await this.checkinRepository.delete(allIds);

    // 删除任务（级联删除子任务）
    await this.taskRepository.delete(id);
  }

  async getDescendantIds(taskId: number): Promise<number[]> {
    const children = await this.taskRepository.find({ where: { parentId: taskId } });
    const ids: number[] = [];
    for (const child of children) {
      ids.push(child.id);
      const descendantIds = await this.getDescendantIds(child.id);
      ids.push(...descendantIds);
    }
    return ids;
  }

  async checkinTask(userId: number, id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException('任务不存在');
    }
    if (task.status === 'done') {
      throw new BadRequestException('任务已打卡');
    }

    task.status = 'done';
    task.completedAt = new Date();
    await this.taskRepository.save(task);

    // 记录打卡
    const checkin = new Checkin();
    checkin.taskId = id;
    checkin.completedAt = new Date();
    await this.checkinRepository.save(checkin);

    // 级联打卡子任务
    await this.cascadeCheckin(userId, id, new Date());

    // 级联向上检查父任务
    await this.cascadeUpCheckin(userId, task.parentId);

    return task;
  }

  async cancelCheckin(userId: number, id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException('任务不存在');
    }
    if (task.status !== 'done') {
      throw new BadRequestException('任务未打卡');
    }

    task.status = 'pending';
    task.completedAt = null;
    await this.taskRepository.save(task);

    // 删除打卡记录
    await this.checkinRepository.delete({ taskId: id });

    // 级联取消子任务打卡
    await this.cascadeCancelCheckin(userId, id);

    // 级联向上取消父任务打卡
    // cascadeUpCancelCheckin disabled: no upward cancel

    return task;
  }

  private async cascadeCheckin(userId: number, parentId: number, completedAt: Date): Promise<void> {
    const children = await this.taskRepository.find({ where: { parentId, userId } });
    for (const child of children) {
      if (child.status !== 'done') {
        child.status = 'done';
        child.completedAt = completedAt;
        await this.taskRepository.save(child);

        const checkin = new Checkin();
        checkin.taskId = child.id;
        checkin.completedAt = completedAt;
        await this.checkinRepository.save(checkin);

        await this.cascadeCheckin(userId, child.id, completedAt);
      }
    }
  }

  private async cascadeUpCheckin(userId: number, parentId: number | null): Promise<void> {
    if (!parentId) return;

    const parent = await this.taskRepository.findOne({ where: { id: parentId, userId } });
    if (!parent) return;

    const children = await this.taskRepository.find({ where: { parentId, userId } });
    const allDone = children.every((c) => c.status === 'done');

    if (allDone && parent.status !== 'done') {
      parent.status = 'done';
      parent.completedAt = new Date();
      await this.taskRepository.save(parent);

      const checkin = new Checkin();
      checkin.taskId = parent.id;
      checkin.completedAt = new Date();
      await this.checkinRepository.save(checkin);

      await this.cascadeUpCheckin(userId, parent.parentId);
    }
  }

  private async cascadeCancelCheckin(userId: number, parentId: number): Promise<void> {
    const children = await this.taskRepository.find({ where: { parentId, userId } });
    for (const child of children) {
      if (child.status === 'done') {
        child.status = 'pending';
        child.completedAt = null;
        await this.taskRepository.save(child);
        await this.checkinRepository.delete({ taskId: child.id });
        await this.cascadeCancelCheckin(userId, child.id);
      }
    }
  }

  private async cascadeUpCancelCheckin(userId: number, parentId: number | null): Promise<void> {
    if (!parentId) return;

    const parent = await this.taskRepository.findOne({ where: { id: parentId, userId } });
    if (!parent) return;

    if (parent.status === 'done') {
      parent.status = 'pending';
      parent.completedAt = null;
      await this.taskRepository.save(parent);
      await this.checkinRepository.delete({ taskId: parent.id });
      await this.cascadeUpCancelCheckin(userId, parent.parentId);
    }
  }

  private buildTree(tasks: Task[]): any[] {
    const map = new Map<number, any>();
    const roots: any[] = [];

    for (const task of tasks) {
      map.set(task.id, { ...task, children: [] });
    }

    for (const task of tasks) {
      const node = map.get(task.id);
      if (task.parentId && map.has(task.parentId)) {
        map.get(task.parentId).children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
}
