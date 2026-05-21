import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { Checkin } from '../../entities/checkin.entity';

@Injectable()
export class CheckinService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Checkin)
    private checkinRepository: Repository<Checkin>,
  ) {}

  async getCheckinsByDateRange(userId: number, startDate: string, endDate: string) {
    const tasks = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.checkins', 'checkin')
      .where('task.userId = :userId', { userId })
      .andWhere('task.plannedDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .andWhere('task.status = :status', { status: 'done' })
      .getMany();

    const result: Record<string, { count: number; minutes: number }> = {};
    for (const task of tasks) {
      const date = task.plannedDate;
      if (!result[date]) {
        result[date] = { count: 0, minutes: 0 };
      }
      // Only count leaf nodes
      const hasChildren = await this.taskRepository.count({ where: { parentId: task.id } });
      if (hasChildren === 0) {
        result[date].count += 1;
        result[date].minutes += task.estimatedMinutes;
      }
    }
    return result;
  }
}
