import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/creat.task.dtos';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getAllTasksById(@Param('id') id: string): Task {
    return this.tasksService.getAllTasksById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(CreateTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id)
  }
}
