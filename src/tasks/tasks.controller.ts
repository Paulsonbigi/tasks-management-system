import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    // eslint-disable-next-line prettier/prettier
    constructor(private tasksService: TasksService) { }
}
