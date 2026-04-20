import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskList } from './entities/task-list.entity';

@Injectable()
export class TaskListsService {
  constructor(
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
  ) {}

  async create(data: { name: string }) {
    const existingList = await this.taskListRepository.findOne({
      where: { name: data.name },
    });

    if (existingList) {
      throw new BadRequestException('A list with this name already exists');
    }

    const taskList = this.taskListRepository.create({
      name: data.name,
    });

    return this.taskListRepository.save(taskList);
  }

  async findAll() {
    return this.taskListRepository.find({
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