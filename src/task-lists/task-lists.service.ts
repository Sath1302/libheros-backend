import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskList } from './entities/task-list.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TaskListsService {
  constructor(
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: { name: string }, userId: number) {
    const existingList = await this.taskListRepository.findOne({
      where: { name: data.name },
    });

    if (existingList) {
      throw new BadRequestException('A list with this name already exists');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const taskList = this.taskListRepository.create({
      name: data.name,
      owner: user,
    });

    return this.taskListRepository.save(taskList);
  }

  async findAll(userId: number) {
    return this.taskListRepository.find({
      where: {
        owner: {
          id: userId,
        },
      },
      relations: ['owner'],
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: number) {
    const taskList = await this.taskListRepository.findOne({
      where: { id },
    });

    if (!taskList) {
      throw new BadRequestException('Task list not found');
    }

    await this.taskListRepository.remove(taskList);

    return {
      message: 'Task list deleted successfully',
    };
  }
}