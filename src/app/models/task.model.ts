import { Developer } from './developer.model';
import { Project } from './project.model';

export interface Task {
  id:           number;
  tittle:       string;
  description:  string;
  limitDate:    Date;
  status: number; 
  creationDate: Date;
  updateDate:   Date;
  developer:  Developer[];
  Project:    Project[];
}

