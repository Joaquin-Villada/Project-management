import { Project } from './project.model';
import { Role } from './role.model';
import { Task } from './task.model';

export interface Developer {
  id: number;
  mail: string;
  name: string;
  startDate: Date;
  creationDate: Date;
  updateDate: Date;
  role: Role;
  project: Project[];
  task: Task[];
}

export interface AddDeveloperDto {
  name: string;
  mail: string;
  idRole: number;
  startDate: Date | undefined;
}

export interface UpdateDevDto {
  name: string;
  mail: string;
  idRole: number;
}
