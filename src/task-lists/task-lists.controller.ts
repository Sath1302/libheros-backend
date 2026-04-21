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
import { TaskListsService } from './task-lists.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

@Controller('task-lists')
@UseGuards(JwtAuthGuard)
export class TaskListsController {
  constructor(private readonly taskListsService: TaskListsService) {}

  @Post()
  create(
    @Body()
    body: {
      name: string;
    },
    @Req() req: any,
  ) {
    return this.taskListsService.create(body, req.user.userId);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.taskListsService.findAll(req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name: string },
    @Req() req: any,
  ) {
    return this.taskListsService.update(
      Number(id),
      body,
      req.user.userId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskListsService.remove(Number(id));
  }
}