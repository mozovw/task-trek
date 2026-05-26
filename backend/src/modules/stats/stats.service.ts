import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getOverview(userId: number) {
    const today = new Date().toISOString().split('T')[0];

    // Get all leaf tasks for this user (only tasks with estimatedMinutes > 0)
    const allTasks = await this.taskRepository.find({ where: { userId } });
    const leafTasks = allTasks.filter(
      (t) => !allTasks.some((other) => other.parentId === t.id) && t.estimatedMinutes > 0,
    );

    const total = leafTasks.length;
    const completed = leafTasks.filter((t) => t.status === 'done').length;
    const completionRate = total > 0 ? Number(((completed / total) * 100).toFixed(1)) : 0;
    const overdue = leafTasks.filter((t) => t.plannedDate < today && t.status !== 'done').length;

    return { total, completed, completionRate, overdue };
  }

  async getTrend(userId: number, days: number) {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days + 1);
    const startDateStr = startDate.toISOString().split('T')[0];

    const allTasks = await this.taskRepository.find({
      where: { userId },
      order: { createdAt: 'ASC' },
    });

    const leafTasks = allTasks.filter(
      (t) => !allTasks.some((other) => other.parentId === t.id) && t.estimatedMinutes > 0,
    );

    const completedTasks = leafTasks.filter(
      (t) => t.status === 'done' && t.completedAt && t.completedAt >= startDate,
    );

    const trend: { date: string; count: number; minutes: number }[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];

      const dayTasks = completedTasks.filter(
        (t) => t.completedAt && t.completedAt.toISOString().split('T')[0] === dateStr,
      );

      trend.push({
        date: dateStr,
        count: dayTasks.length,
        minutes: dayTasks.reduce((sum, t) => sum + t.estimatedMinutes, 0),
      });
    }

    return trend;
  }

  async getUnfinished(userId: number) {
    const today = new Date().toISOString().split('T')[0];

    const allTasks = await this.taskRepository.find({
      where: { userId, status: 'pending' },
      order: { plannedDate: 'ASC' },
    });

    const leafTasks = allTasks.filter(
      (t) =>
        !allTasks.some((other) => other.parentId === t.id) &&
        t.estimatedMinutes > 0 &&
        t.plannedDate < today,
    );

    return leafTasks.map((t) => ({
      id: t.id,
      name: t.name,
      plannedDate: t.plannedDate,
      estimatedMinutes: t.estimatedMinutes,
    }));
  }

  async getCalendarData(userId: number, year: number, month: number) {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDateStr = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

    const tasks = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId })
      .andWhere('task.plannedDate >= :startDate', { startDate })
      .andWhere('task.plannedDate <= :endDate', { endDate: endDateStr })
      .andWhere('task.estimatedMinutes > 0')
      .orderBy('task.plannedDate', 'ASC')
      .getMany();

    const result: Record<string, { name: string; status: string; level: number }[]> = {};
    for (const task of tasks) {
      if (!result[task.plannedDate]) {
        result[task.plannedDate] = [];
      }
      result[task.plannedDate].push({ name: task.name, status: task.status, level: task.level });
    }

    return result;
  }
}
