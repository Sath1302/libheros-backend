import {
  Body,
  Controller,
  Delete,
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
  create(@Body() body: any, @Req() req: any) {
    return this.tasksService.create(body, req.user.userId);
  }

  @Get('task-list/:taskListId')
  findByTaskList(@Param('taskListId') taskListId: string, @Req() req: any) {
    return this.tasksService.findByTaskList(
      Number(taskListId),
      req.user.userId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.findOne(Number(id), req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any, @Req() req: any) {
    return this.tasksService.update(Number(id), body, req.user.userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.delete(Number(id), req.user.userId);
  }
}