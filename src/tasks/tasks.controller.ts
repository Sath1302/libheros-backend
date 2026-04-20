import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
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
  ) {
    return this.tasksService.create(body);
  }

  @Get('task-list/:taskListId')
  findByTaskList(@Param('taskListId') taskListId: string) {
    return this.tasksService.findByTaskList(Number(taskListId));
  }

  @Patch(':id/complete')
  toggleComplete(
    @Param('id') id: string,
    @Body() body: { isCompleted: boolean },
  ) {
    return this.tasksService.toggleComplete(Number(id), body.isCompleted);
  }
}