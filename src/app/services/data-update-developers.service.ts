import { Injectable } from '@angular/core';
import { Developer } from '../models/developer.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../models/project.model';

const developers: Developer[] = [];

@Injectable({
  providedIn: 'root',
})
export class DataUpdateDevelopersService {
  // Actualizar y setear la lista de desarrolladores
  private sharingDeveloperObservable$: BehaviorSubject<Developer[]> = new BehaviorSubject<Developer[]>(developers);

  get developers(): Observable<Developer[]> {
    return this.sharingDeveloperObservable$.asObservable();
  }

  set developersData(data: Developer[]) {
    this.sharingDeveloperObservable$.next(data);
  }

  set addDeveloperData(developer: Developer) {
    const currentDevelopers = this.sharingDeveloperObservable$.getValue();
    this.sharingDeveloperObservable$.next([...currentDevelopers, developer]);
  }

  set deleteDeveloperData(id: number) {
    const currentDevelopers = this.sharingDeveloperObservable$.getValue();
    const updatedDevelopers = currentDevelopers.filter(d => d.id !== id);
    this.sharingDeveloperObservable$.next(updatedDevelopers);
  }

  constructor() {}
}
