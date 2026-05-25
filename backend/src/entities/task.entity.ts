import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn, Index,
} from 'typeorm';
import { User } from './user.entity';
import { Checkin } from './checkin.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => Task, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: Task;

  @Column({ name: 'parent_id', nullable: true, type: 'integer' })
  parentId: number | null;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string | null;

  @Column()
  level: number;

  @Column({ default: 0, type: 'integer' })
  estimatedMinutes: number;

  @Column({ type: 'text' })
  plannedDate: string;

  @Column({ nullable: true, type: 'text' })
  dueDate: string;

  @Column({ default: 'pending', type: 'text' })
  status: string;

  @Column({ nullable: true, type: 'datetime' })
  completedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  // 倒计时相关字段
  @Column({ default: 0, type: 'integer', name: 'remaining_seconds' })
  remainingSeconds: number;

  @Column({ default: false, type: 'boolean', name: 'timer_running' })
  timerRunning: boolean;

  @Column({ nullable: true, type: 'datetime', name: 'timer_started_at' })
  timerStartedAt: Date | null;

  // 原始预计耗时（用于任务完成时恢复）
  @Column({ default: 0, type: 'integer', name: 'original_estimated_minutes' })
  originalEstimatedMinutes: number;

  // 重复任务系列标识
  @Index('idx_tasks_repeat_series')
  @Column({ nullable: true, type: 'text', name: 'repeat_series_id' })
  repeatSeriesId: string | null;

  // 重复截止日期
  @Column({ nullable: true, type: 'text', name: 'repeat_until_date' })
  repeatUntilDate: string | null;

  // 任务备注
  @Column({ nullable: true, type: 'text' })
  remark: string | null;

  // 重复频次（0-6 对应周日-周六，JSON数组）
  @Column({ nullable: true, type: 'simple-json', name: 'repeat_days' })
  repeatDays: number[] | null;

  @OneToMany(() => Task, (task) => task.parent)
  children: Task[];

  @OneToMany(() => Checkin, (checkin) => checkin.task)
  checkins: Checkin[];
}
