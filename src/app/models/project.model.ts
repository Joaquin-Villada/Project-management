import { Developer } from './developer.model';
import { Task } from './task.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  creationDate: Date;
  updateDate: Date;
  developer: Developer[];
  task: Task[];
}

export interface AddProjectDto {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
}

// export interface TaskDto {
//   id:           number;
//   tittle:       string;
//   description:  string;
//   limitDate:    Date;
//   creationDate: Date;
//   updateDate:   Date;
// }
