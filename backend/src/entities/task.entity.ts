import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn,
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

  @OneToMany(() => Task, (task) => task.parent)
  children: Task[];

  @OneToMany(() => Checkin, (checkin) => checkin.task)
  checkins: Checkin[];
}
