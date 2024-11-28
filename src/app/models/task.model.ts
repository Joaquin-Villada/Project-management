import { Developer } from './developer.model';
import { Project } from './project.model';

export interface Task {
  id:           number;
  tittle:       string;
  description:  string;
  limitDate:    Date;
  creationDate: Date;
  updateDate:   Date;
  developer:  Developer[];
  Project:    Project[];
}

