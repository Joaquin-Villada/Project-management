import { BehaviorSubject } from 'rxjs';
import { Task } from './../models/task.model';
import { Injectable } from '@angular/core';

const tasks: Task[] = []

@Injectable({
  providedIn: 'root'
})

export class DataUpdateTasksService {
  private sharingDeveloperObservable$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(tasks);

  get tasks(): Task[] {
    return this.sharingDeveloperObservable$.getValue();
  }

  set tasksData(data: Task[]) {
    this.sharingDeveloperObservable$.next(data);
  }

  set addTaskData(task: Task) {
    const currentTasks = this.sharingDeveloperObservable$.getValue();
    this.sharingDeveloperObservable$.next([...currentTasks, task]);
  }
  
  constructor() { }
}
