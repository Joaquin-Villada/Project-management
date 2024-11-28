import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddProjectDto, Project } from '../models/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private API_URL: string = `http://localhost:3000/projects`;

  private http: HttpClient = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.API_URL);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.API_URL}/${id}`);
  }

  addProject(project: AddProjectDto) {
    return this.http.post(this.API_URL, project);
  }

  updateProject(id: number, Project: Project) {
    return this.http.put(`${this.API_URL}/${id}`, Project);
  }

  deleteProject(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
