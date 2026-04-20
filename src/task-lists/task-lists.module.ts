import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from './entities/task-list.entity';
import { User } from '../users/entities/user.entity';

import { TaskListsController } from './task-lists.controller';
import { TaskListsService } from './task-lists.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList, User])],
  controllers: [TaskListsController],
  providers: [TaskListsService],
})
export class TaskListsModule {}