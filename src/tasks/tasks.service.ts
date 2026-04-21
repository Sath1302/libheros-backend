import { Injectable, BadRequestException } from '@nestjs/common';
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

  async create(
    data: {
      shortDescription: string;
      longDescription?: string;
      dueDate: string;
      taskListId: number;
    },
    userId: number,
  ) {
    const taskList = await this.taskListRepository.findOne({
      where: {
        id: data.taskListId,
        owner: { id: userId },
      },
      relations: ['owner'],
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

  async findByTaskList(taskListId: number, userId: number) {
    return this.taskRepository.find({
      where: {
        taskList: {
          id: taskListId,
          owner: { id: userId },
        },
      },
      relations: ['taskList'],
      order: { createdAt: 'DESC' },
    });
  }

  async toggleComplete(id: number, isCompleted: boolean, userId: number) {
    const task = await this.taskRepository.findOne({
      where: {
        id,
        taskList: {
          owner: { id: userId },
        },
      },
      relations: ['taskList', 'taskList.owner'],
    });

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    task.isCompleted = isCompleted;

    return this.taskRepository.save(task);
  }

  async update(
    id: number,
    data: {
      shortDescription?: string;
      longDescription?: string;
      dueDate?: string;
    },
    userId: number,
  ) {
    const task = await this.taskRepository.findOne({
      where: {
        id,
        taskList: {
          owner: { id: userId },
        },
      },
      relations: ['taskList', 'taskList.owner'],
    });

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    if (data.shortDescription !== undefined) {
      task.shortDescription = data.shortDescription;
    }

    if (data.longDescription !== undefined) {
      task.longDescription = data.longDescription;
    }

    if (data.dueDate !== undefined) {
      task.dueDate = new Date(data.dueDate);
    }

    return this.taskRepository.save(task);
  }

  async delete(id: number, userId: number) {
    const task = await this.taskRepository.findOne({
      where: {
        id,
        taskList: {
          owner: { id: userId },
        },
      },
      relations: ['taskList', 'taskList.owner'],
    });

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    await this.taskRepository.remove(task);

    return {
      message: 'Task deleted successfully',
    };
  }
}