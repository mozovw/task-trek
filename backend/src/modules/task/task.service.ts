import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { Checkin } from '../../entities/checkin.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import * as crypto from 'crypto';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

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

    // 保存原始预计耗时
    saved.originalEstimatedMinutes = saved.estimatedMinutes;
    await this.taskRepository.update(saved.id, { originalEstimatedMinutes: saved.estimatedMinutes });

    // 如果父任务有子任务，将父任务耗时置零
    if (saved.parentId) {
      await this.taskRepository.update(saved.parentId, { estimatedMinutes: 0 });
    }

    return saved;
  }

  async updateTask(userId: number, id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException('任务不存在');
    }
    if (task.status === 'done') {
      throw new BadRequestException('已完成的任务不可修改');
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
    // 如果修改了预计耗时，同步更新原始预计耗时
    if (dto.estimatedMinutes !== undefined) {
      task.originalEstimatedMinutes = dto.estimatedMinutes;
    }
    // 如果任务之前有倒计时，编辑时清除倒计时信息
    if (task.timerRunning || task.remainingSeconds > 0) {
      task.timerRunning = false;
      task.timerStartedAt = null;
      task.remainingSeconds = 0;
    }
    const saved = await this.taskRepository.save(task);

    // 如果父任务有子任务，将父任务耗时置零
    if (task.parentId) {
      await this.taskRepository.update(task.parentId, { estimatedMinutes: 0 });
    }

    // 如果设置了重复截止日期且为一级任务，创建重复任务系列
    if (dto.repeatUntilDate && task.level === 1) {
      this.logger.log(`Creating repeat series for task ${saved.id}, repeatUntilDate=${dto.repeatUntilDate}`);
      await this.createRepeatedTasks(userId, saved, dto.repeatUntilDate);
    }

    return saved;
  }

  async deleteTask(userId: number, id: number, deleteAll = false): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException('任务不存在');
    }
    if (task.status === 'done') {
      throw new BadRequestException('已完成的任务不可删除');
    }

    // 如果有重复系列且要求删除全部
    if (deleteAll && task.repeatSeriesId) {
      this.logger.log(`Deleting all tasks in repeat series ${task.repeatSeriesId}`);
      const seriesTasks = await this.taskRepository.find({
        where: { userId, repeatSeriesId: task.repeatSeriesId },
      });
      const allIds = seriesTasks.map(t => t.id);
      // 收集所有子任务ID
      for (const st of seriesTasks) {
        const descendantIds = await this.getDescendantIds(st.id);
        allIds.push(...descendantIds);
      }
      // 删除打卡记录
      await this.checkinRepository.delete(allIds);
      // 删除所有系列任务
      for (const st of seriesTasks) {
        await this.taskRepository.delete(st.id);
      }
      this.logger.log(`Deleted ${seriesTasks.length} tasks in series ${task.repeatSeriesId}`);
      return;
    }

    const descendants = await this.getDescendantIds(id);
    const allIds = [id, ...descendants];

    // 删除关联的打卡记录
    await this.checkinRepository.delete(allIds);

    // 删除任务（级联删除子任务）
    await this.taskRepository.delete(id);

    this.logger.log(`Deleted task ${id}${task.repeatSeriesId ? ` (series: ${task.repeatSeriesId})` : ''}`);
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

    // 保存当前预计耗时，用于取消时恢复
    task.originalEstimatedMinutes = task.estimatedMinutes;
    task.status = 'done';
    task.completedAt = new Date();
    // 重置定时信息
    task.remainingSeconds = 0;
    task.timerRunning = false;
    task.timerStartedAt = null;
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

    // 恢复预计耗时为原始值
    task.estimatedMinutes = task.originalEstimatedMinutes;
    task.status = 'pending';
    task.completedAt = null;
    await this.taskRepository.save(task);

    // 删除打卡记录
    await this.checkinRepository.delete({ taskId: id });

    // 级联取消子任务打卡
    await this.cascadeCancelCheckin(userId, id);

    // 级联向上取消父任务打卡
    await this.cascadeUpCancelCheckin(userId, task.parentId);

    return task;
  }

  // 倒计时相关方法
  async startTimer(userId: number, id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException('任务不存在');
    }
    if (task.estimatedMinutes <= 0) {
      throw new BadRequestException('该任务没有设置预计耗时');
    }
    if (task.status === 'done') {
      throw new BadRequestException('任务已完成');
    }

    // 如果是首次启动，设置剩余时间为预计耗时（秒）
    if (task.remainingSeconds === 0) {
      task.remainingSeconds = task.estimatedMinutes * 60;
    }

    task.timerRunning = true;
    task.timerStartedAt = new Date();
    return this.taskRepository.save(task);
  }

  async pauseTimer(userId: number, id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException('任务不存在');
    }
    if (!task.timerRunning) {
      throw new BadRequestException('任务计时器未运行');
    }

    // 计算已经过去的秒数
    if (task.timerStartedAt) {
      const elapsed = Math.floor((new Date().getTime() - task.timerStartedAt.getTime()) / 1000);
      task.remainingSeconds = Math.max(0, task.remainingSeconds - elapsed);
    }

    task.timerRunning = false;
    task.timerStartedAt = null;
    return this.taskRepository.save(task);
  }

  async syncTimer(userId: number, id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException('任务不存在');
    }
    if (!task.timerRunning) {
      throw new BadRequestException('任务计时器未运行');
    }

    // 计算已经过去的秒数并更新剩余时间
    if (task.timerStartedAt) {
      const elapsed = Math.floor((new Date().getTime() - task.timerStartedAt.getTime()) / 1000);
      task.remainingSeconds = Math.max(0, task.remainingSeconds - elapsed);
      
      // 如果时间到了，自动完成任务
      if (task.remainingSeconds <= 0) {
        task.timerRunning = false;
        task.timerStartedAt = null;
        task.status = 'done';
        task.completedAt = new Date();
        await this.taskRepository.save(task);
        
        // 记录打卡
        const checkin = new Checkin();
        checkin.taskId = id;
        checkin.completedAt = new Date();
        await this.checkinRepository.save(checkin);
        
        // 级联打卡
        await this.cascadeCheckin(userId, id, new Date());
        await this.cascadeUpCheckin(userId, task.parentId);
        
        return task;
      }
      
      task.timerStartedAt = new Date(); // 重置启动时间，用于下次计算
      return this.taskRepository.save(task);
    }

    return task;
  }

  private async cascadeCheckin(userId: number, parentId: number, completedAt: Date): Promise<void> {
    const children = await this.taskRepository.find({ where: { parentId, userId } });
    for (const child of children) {
      if (child.status !== 'done') {
        // 保存当前预计耗时，用于取消时恢复
        child.originalEstimatedMinutes = child.estimatedMinutes;
        child.status = 'done';
        child.completedAt = completedAt;
        // 重置定时信息
        child.remainingSeconds = 0;
        child.timerRunning = false;
        child.timerStartedAt = null;
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
      // 保存当前预计耗时，用于取消时恢复
      parent.originalEstimatedMinutes = parent.estimatedMinutes;
      parent.status = 'done';
      parent.completedAt = new Date();
      // 重置定时信息
      parent.remainingSeconds = 0;
      parent.timerRunning = false;
      parent.timerStartedAt = null;
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
        // 恢复预计耗时为原始值
        child.estimatedMinutes = child.originalEstimatedMinutes;
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

    const children = await this.taskRepository.find({ where: { parentId, userId } });
    const allDone = children.every(c => c.status === 'done');

    if (allDone && parent.status !== 'done') {
      // 所有子任务完成，父任务设为完成
      parent.status = 'done';
      parent.completedAt = new Date();
      await this.taskRepository.save(parent);

      const checkin = new Checkin();
      checkin.taskId = parent.id;
      checkin.completedAt = new Date();
      await this.checkinRepository.save(checkin);

      await this.cascadeUpCancelCheckin(userId, parent.parentId);
    } else if (!allDone && parent.status === 'done') {
      // 有子任务未完成，父任务取消完成
      parent.status = 'pending';
      parent.completedAt = null;
      await this.taskRepository.save(parent);
      await this.checkinRepository.delete({ taskId: parent.id });

      await this.cascadeUpCancelCheckin(userId, parent.parentId);
    }
  }

  // ===== 重复任务系列方法 =====

  async updateRepeatSeries(userId: number, id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) throw new NotFoundException('任务不存在');
    if (!task.repeatSeriesId) throw new BadRequestException('任务不属于重复系列');

    // 重复系列任务不可修改计划日期
    if (dto.plannedDate !== undefined && dto.plannedDate !== task.plannedDate) {
      throw new BadRequestException('重复系列任务不可修改计划日期');
    }

    // 重复系列任务已完成或有子任务时不可修改预计耗时
    if (dto.estimatedMinutes !== undefined) {
      if (task.status === 'done') {
        throw new BadRequestException('已完成的任务不可修改预计耗时');
      }
      const childCount = await this.taskRepository.count({ where: { parentId: task.id } });
      if (childCount > 0) {
        throw new BadRequestException('含有子任务的任务不可修改预计耗时');
      }
    }

    // 只同步非日期、非状态属性
    const syncFields: (keyof UpdateTaskDto)[] = ['name', 'description', 'estimatedMinutes', 'level'];
    const hasSyncableField = syncFields.some(f => dto[f] !== undefined);
    if (!hasSyncableField) {
      return this.updateTask(userId, id, dto);
    }

    const seriesTasks = await this.taskRepository.find({
      where: { userId, repeatSeriesId: task.repeatSeriesId, level: task.level, name: task.name },
    });
    this.logger.log(`Syncing ${seriesTasks.length} tasks (level ${task.level}, name "${task.name}") in series ${task.repeatSeriesId} from task ${id}`);

    for (const st of seriesTasks) {
      if (st.status === 'done') continue;
      let changed = false;
      if (dto.name !== undefined && st.name !== dto.name) {
        this.logger.log(`Series sync: task ${st.id} name: "${st.name}" -> "${dto.name}"`);
        st.name = dto.name;
        changed = true;
      }
      if (dto.description !== undefined && st.description !== dto.description) {
        st.description = dto.description;
        changed = true;
      }
      if (dto.estimatedMinutes !== undefined && st.estimatedMinutes !== dto.estimatedMinutes) {
        // 有子任务的任务不同步预计耗时
        const childCount = await this.taskRepository.count({ where: { parentId: st.id } });
        if (childCount === 0) {
          st.estimatedMinutes = dto.estimatedMinutes;
          st.originalEstimatedMinutes = dto.estimatedMinutes;
          changed = true;
        }
      }
      if (dto.level !== undefined && st.level !== dto.level) {
        st.level = dto.level;
        changed = true;
      }
      if (changed) {
        await this.taskRepository.save(st);
      }
    }

    this.logger.log(`Series sync complete for ${task.repeatSeriesId}`);
    return this.taskRepository.findOne({ where: { id, userId } }) as Promise<Task>;
  }

  private async createRepeatedTasks(userId: number, task: Task, repeatUntilDate: string): Promise<void> {
    if (repeatUntilDate <= task.plannedDate) {
      this.logger.warn(`repeatUntilDate ${repeatUntilDate} is not after plannedDate ${task.plannedDate}`);
      return;
    }

    const repeatSeriesId = crypto.randomUUID();
    this.logger.log(`Creating repeat series ${repeatSeriesId} for task ${task.id} (${task.plannedDate} ~ ${repeatUntilDate})`);

    const allDescendants = await this.getAllDescendants(task.id);

    const dates: string[] = [];
    const d = new Date(task.plannedDate + 'T00:00:00');
    const end = new Date(repeatUntilDate + 'T00:00:00');
    d.setDate(d.getDate() + 1);
    while (d <= end) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
      d.setDate(d.getDate() + 1);
    }

    if (dates.length === 0) return;

    const BATCH_SIZE = 50;
    this.logger.log(`Creating ${dates.length} copies in batches of ${BATCH_SIZE}`);

    const queryRunner = this.taskRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(Task, task.id, {
        repeatSeriesId,
        repeatUntilDate,
      });

      for (let i = 0; i < dates.length; i += BATCH_SIZE) {
        const batchDates = dates.slice(i, i + BATCH_SIZE);
        for (const dateStr of batchDates) {
          const newParent = await this.createTaskCopy(
            queryRunner.manager, userId, task, dateStr, repeatSeriesId, repeatUntilDate, null,
          );
          if (allDescendants.length > 0) {
            await this.createDescendantCopies(
              queryRunner.manager, userId, allDescendants, newParent.id, dateStr, repeatSeriesId, repeatUntilDate,
            );
          }
        }
      }

      await queryRunner.commitTransaction();
      this.logger.log(`Repeat series ${repeatSeriesId}: ${dates.length} copies created successfully`);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Repeat series ${repeatSeriesId} failed: ${e.message}`);
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  private async getAllDescendants(taskId: number): Promise<Task[]> {
    const children = await this.taskRepository.find({ where: { parentId: taskId } });
    const all: Task[] = [];
    for (const child of children) {
      all.push(child);
      const grandChildren = await this.getAllDescendants(child.id);
      all.push(...grandChildren);
    }
    return all;
  }

  private async createTaskCopy(
    manager: any, userId: number, source: Task, dateStr: string,
    seriesId: string, untilDate: string, parentId: number | null,
  ): Promise<Task> {
    const copy = new Task();
    copy.userId = userId;
    copy.name = source.name;
    copy.description = source.description;
    copy.level = source.level;
    copy.estimatedMinutes = source.estimatedMinutes;
    copy.originalEstimatedMinutes = source.originalEstimatedMinutes;
    copy.plannedDate = dateStr;
    copy.dueDate = null as any;
    copy.status = 'pending';
    copy.repeatSeriesId = seriesId;
    copy.repeatUntilDate = untilDate;
    copy.parentId = parentId;
    copy.remainingSeconds = 0;
    copy.timerRunning = false;
    copy.timerStartedAt = null;
    copy.completedAt = null;

    const saved = await manager.save(Task, copy);

    if (parentId) {
      await manager.update(Task, parentId, { estimatedMinutes: 0 });
    }

    return saved;
  }

  private async createDescendantCopies(
    manager: any, userId: number, descendants: Task[],
    newParentId: number, dateStr: string, seriesId: string, untilDate: string,
  ): Promise<void> {
    const sorted = [...descendants].sort((a, b) => a.level - b.level);
    const idMap = new Map<number, number>();

    for (const desc of sorted) {
      const newParent = idMap.get(desc.parentId!) || newParentId;
      const copy = await this.createTaskCopy(manager, userId, desc, dateStr, seriesId, untilDate, newParent);
      idMap.set(desc.id, copy.id);
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
