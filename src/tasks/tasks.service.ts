import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/creat.task.dtos';
import { GetFilterDtos } from './dto/get-tasks-dtos';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetFilterDtos): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    //  define a temporary array to hold the result
    if (status) {
      tasks = tasks.filter((task) => (task.status = status));
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
        ) {
          return true;
        } else {
          return false;
        }
      });
    }

    return tasks;
  }

  getAllTasksById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getAllTasksById(id);
    task.status = status;
    return task;
  }
}
