import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
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
    @Req() req: any,
  ) {
    return this.tasksService.create(body, req.user.userId);
  }

  @Get('task-list/:taskListId')
  findByTaskList(
    @Param('taskListId') taskListId: string,
    @Req() req: any,
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
    @Req() req: any,
  ) {
    return this.tasksService.toggleComplete(
      Number(id),
      body.isCompleted,
      req.user.userId,
    );
  }
}