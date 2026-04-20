import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskList } from '../task-lists/entities/task-list.entity';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskList])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}