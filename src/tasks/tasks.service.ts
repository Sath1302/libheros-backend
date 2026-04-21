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

  private formatTask(task: Task) {
    return {
      id: task.id,
      shortDescription: task.shortDescription,
      longDescription: task.longDescription,
      dueDate: task.dueDate,
      isCompleted: task.isCompleted,
      createdAt: task.createdAt,
      taskList: task.taskList
        ? {
            id: task.taskList.id,
            name: task.taskList.name,
          }
        : null,
    };
  }

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

    const savedTask = await this.taskRepository.save(task);

    const createdTask = await this.taskRepository.findOne({
      where: { id: savedTask.id },
      relations: ['taskList'],
    });

    if (!createdTask) {
      throw new BadRequestException('Task not found');
    }

    return this.formatTask(createdTask);
  }

  async findByTaskList(taskListId: number, userId: number) {
    const tasks = await this.taskRepository.find({
      where: {
        taskList: {
          id: taskListId,
          owner: { id: userId },
        },
      },
      relations: ['taskList'],
      order: { createdAt: 'DESC' },
    });

    return tasks.map((task) => this.formatTask(task));
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

    const updatedTask = await this.taskRepository.save(task);

    const foundTask = await this.taskRepository.findOne({
      where: { id: updatedTask.id },
      relations: ['taskList'],
    });

    if (!foundTask) {
      throw new BadRequestException('Task not found');
    }

    return this.formatTask(foundTask);
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

    const updatedTask = await this.taskRepository.save(task);

    const foundTask = await this.taskRepository.findOne({
      where: { id: updatedTask.id },
      relations: ['taskList'],
    });

    if (!foundTask) {
      throw new BadRequestException('Task not found');
    }

    return this.formatTask(foundTask);
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