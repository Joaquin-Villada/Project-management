import { Task } from './../models/task.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http =  inject(HttpClient);

  API_URL = 'http://localhost:3000/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API_URL, task);
  }
  constructor() { }
}
