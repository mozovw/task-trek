import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { Checkin } from '../../entities/checkin.entity';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Checkin)
    private checkinRepository: Repository<Checkin>,
  ) {}

  async exportMarkdown(userId: number): Promise<string> {
    const tasks = await this.taskRepository.find({
      where: { userId },
      order: { level: 'ASC', plannedDate: 'ASC' },
    });

    const tree = this.buildTree(tasks);
    let md = '# 任务导出\n\n';
    md += '> 导出时间：' + new Date().toISOString().split('T')[0] + '\n\n';

    for (const root of tree) {
      md += this.renderTask(root, 1);
    }

    return md;
  }

  async importMarkdown(userId: number, content: string): Promise<any> {
    const lines = content.split('\n');
    const parsed: { level: number; name: string; date?: string; minutes?: number; description?: string; status?: string }[] = [];

    let currentTask: { level: number; name: string; date?: string; minutes?: number; description?: string; status?: string } | null = null;

    for (const line of lines) {
      const headingMatch = line.match(/^(#{1,3})\s+(.+)/);
      if (headingMatch) {
        // Push previous task if exists
        if (currentTask) {
          parsed.push(currentTask);
        }
        const level = headingMatch[1].length;
        const name = headingMatch[2].trim();
        currentTask = { level, name };
      } else if (currentTask) {
        // Parse properties
        const dateMatch = line.match(/日期[：:]\s*(\d{4}-\d{2}-\d{2})/);
        const minutesMatch = line.match(/耗时[：:]\s*(\d+)/);
        const descMatch = line.match(/描述[：:]\s*(.+)/);
        const statusMatch = line.match(/状态[：:]\s*(已完成|未完成|done|pending)/);

        if (dateMatch) currentTask.date = dateMatch[1];
        if (minutesMatch) currentTask.minutes = parseInt(minutesMatch[1], 10);
        if (descMatch) currentTask.description = descMatch[1];
        if (statusMatch) currentTask.status = ['已完成', 'done'].includes(statusMatch[1]) ? 'done' : 'pending';
      }
    }

    // Push last task
    if (currentTask) {
      parsed.push(currentTask);
    }

    const allTasks = await this.taskRepository.find({ where: { userId } });
    let success = 0;
    let updated = 0;
    const errors: string[] = [];

    const parentStack: { level: number; id: number }[] = [];

    for (const item of parsed) {
      try {
        while (parentStack.length > 0 && parentStack[parentStack.length - 1].level >= item.level) {
          parentStack.pop();
        }

        const parentId = parentStack.length > 0 ? parentStack[parentStack.length - 1].id : null;

        // Check for duplicate
        const existing = allTasks.find(
          (t) => t.userId === userId && t.parentId === parentId && t.name === item.name && t.plannedDate === item.date,
        );

        if (existing) {
          existing.status = item.status || 'pending';
          existing.estimatedMinutes = item.minutes || 0;
          existing.description = item.description || null;
          await this.taskRepository.save(existing);
          updated++;
          parentStack.push({ level: item.level, id: existing.id });
        } else {
          const task = new Task();
          task.userId = userId;
          task.name = item.name;
          task.level = item.level;
          task.plannedDate = item.date || new Date().toISOString().split('T')[0];
          task.estimatedMinutes = item.minutes || 0;
          task.description = item.description || null;
          task.status = item.status || 'pending';
          task.parentId = parentId;

          if (item.status === 'done') {
            task.completedAt = new Date();
          }

          const saved = await this.taskRepository.save(task);
          allTasks.push(saved); // Add to allTasks for subsequent duplicate checks
          parentStack.push({ level: item.level, id: saved.id });
          success++;
        }
      } catch (e: any) {
        errors.push(`导入 "${item.name}" 失败: ${e.message}`);
      }
    }

    // 自动调整父任务耗时
    await this.adjustParentEstimatedMinutes(userId);

    return { success, updated, errors };
  }

  async clearAllTasks(userId: number): Promise<void> {
    const tasks = await this.taskRepository.find({ where: { userId } });
    const taskIds = tasks.map((t) => t.id);
    if (taskIds.length > 0) {
      const checkins = await this.checkinRepository.find({ where: { taskId: In(taskIds) } });
      if (checkins.length > 0) {
        await this.checkinRepository.remove(checkins);
      }
    }
    await this.taskRepository.delete({ userId });
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

  private renderTask(task: any, level: number): string {
    const prefix = '#'.repeat(level);
    const status = task.status === 'done' ? '已完成' : '未完成';
    let line = `${prefix} ${task.name}\n`;
    line += `- 日期：${task.plannedDate}\n`;

    if (task.level === 1 || task.level === 2) {
      const hasChildren = task.children && task.children.length > 0;
      if (hasChildren) {
        line += `- 耗时：0分钟（${level === 1 ? '一' : '二'}级任务，耗时由子任务累加）\n`;
      } else {
        line += `- 耗时：${task.estimatedMinutes}分钟\n`;
      }
    } else {
      line += `- 耗时：${task.estimatedMinutes}分钟\n`;
    }

    if (task.description) {
      line += `- 描述：${task.description}\n`;
    }
    line += `- 状态：${status}\n\n`;

    for (const child of task.children) {
      line += this.renderTask(child, level + 1);
    }

    return line;
  }

  private async adjustParentEstimatedMinutes(userId: number): Promise<void> {
    const allTasks = await this.taskRepository.find({ where: { userId } });

    for (const task of allTasks) {
      const hasChildren = allTasks.some((t) => t.parentId === task.id);
      if (hasChildren && (task.level === 1 || task.level === 2)) {
        if (task.estimatedMinutes !== 0) {
          task.estimatedMinutes = 0;
          await this.taskRepository.save(task);
        }
      }
    }
  }
}
