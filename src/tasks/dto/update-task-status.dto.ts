import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.status.enum';

export class UpdatesTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
