import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
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
  ) {
    return this.tasksService.create(body);
  }

  @Get('task-list/:taskListId')
  findByTaskList(@Param('taskListId') taskListId: string) {
    return this.tasksService.findByTaskList(Number(taskListId));
  }
}