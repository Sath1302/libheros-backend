import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body()
    body: {
      shortDescription: string;
      longDescription?: string;
      dueDate: string;
      taskListId: number;
    },
    @Request() req,
  ) {
    return this.tasksService.create(body, req.user.userId);
  }

  @Get('task-list/:taskListId')
  findByTaskList(
    @Param('taskListId') taskListId: string,
    @Request() req,
  ) {
    return this.tasksService.findByTaskList(
      Number(taskListId),
      req.user.userId,
    );
  }

  @Patch(':id/complete')
  toggleComplete(
    @Param('id') id: string,
    @Body() body: { isCompleted: boolean },
    @Request() req,
  ) {
    return this.tasksService.toggleComplete(
      Number(id),
      body.isCompleted,
      req.user.userId,
    );
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.tasksService.delete(
      Number(id),
      req.user.userId,
    );
  }
}