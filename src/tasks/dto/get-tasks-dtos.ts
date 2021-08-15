import { TaskStatus } from '../tasks.model';

export class GetFilterDtos {
  status?: TaskStatus;
  search?: string;
}
