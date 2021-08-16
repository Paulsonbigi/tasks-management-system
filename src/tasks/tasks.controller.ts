import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create.task.dtos';
import { GetFilterDtos } from './dto/get-tasks-dtos';
import { UpdatesTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterData: GetFilterDtos): Task[] {
    if (Object.keys(filterData).length) {
      this.tasksService.getTasksWithFilters(filterData);
    } else {
      return this.tasksService.getAllTasks();
    }
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
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status') updateTaskStatusDto: UpdatesTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTask(id, status);
  }
}
