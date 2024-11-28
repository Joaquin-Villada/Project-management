import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { BehaviorSubject, Observable } from 'rxjs';

const projects: Project[] = [];

@Injectable({
  providedIn: 'root',
})
export class DataUpdateProjectsService {
  // Actualizar y setear la lista de desarrolladores
  private sharingProjectObservable$: BehaviorSubject<Project[]> =
    new BehaviorSubject<Project[]>(projects);

  get projects(): Observable<Project[]> {
    return this.sharingProjectObservable$.asObservable();
  }

  set projectsData(data: Project[]) {
    this.sharingProjectObservable$.next(data);
  }

  set addProjectData(project: Project) {
    const currentDevelopers = this.sharingProjectObservable$.getValue();
    this.sharingProjectObservable$.next([...currentDevelopers, project]);
  }

  set deleteProjectData(id: number) {
    const currentProjects = this.sharingProjectObservable$.getValue();
    const updatedProjects = currentProjects.filter((p) => p.id !== id);
    this.sharingProjectObservable$.next(updatedProjects);
  }

  constructor() {}
}
