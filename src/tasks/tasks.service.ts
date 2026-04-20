import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './entities/task.entity';
import { TaskList } from '../task-lists/entities/task-list.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
  ) {}

  async create(data: {
    shortDescription: string;
    longDescription?: string;
    dueDate: string;
    taskListId: number;
  }) {
    const taskList = await this.taskListRepository.findOne({
      where: { id: data.taskListId },
    });

    if (!taskList) {
      throw new BadRequestException('Task list not found');
    }

    const task = this.taskRepository.create({
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      dueDate: new Date(data.dueDate),
      taskList,
    });

    return this.taskRepository.save(task);
  }

  async findByTaskList(taskListId: number) {
    return this.taskRepository.find({
      where: {
        taskList: {
          id: taskListId,
        },
      },
      relations: ['taskList'],
      order: { createdAt: 'DESC' },
    });
  }
}