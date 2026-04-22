import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TaskList } from '../../task-lists/entities/task-list.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortDescription: string;

  @Column({ nullable: true, type: 'text' })
  longDescription?: string;

  @Column()
  dueDate: Date;

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => TaskList, (taskList) => taskList.tasks, {
    onDelete: 'CASCADE',
  })
  taskList: TaskList;
}