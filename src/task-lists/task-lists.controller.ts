import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaskListsService } from './task-lists.service';

@Controller('task-lists')
export class TaskListsController {
  constructor(private readonly taskListsService: TaskListsService) {}

  @Post()
  create(
    @Body()
    body: {
      name: string;
    },
  ) {
    return this.taskListsService.create(body);
  }

  @Get()
  findAll() {
    return this.taskListsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskListsService.remove(Number(id));
  }
}