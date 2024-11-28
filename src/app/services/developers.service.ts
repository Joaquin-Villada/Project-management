import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Developer } from '../models/developer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DevelopersService {
  private API_URL = `http://localhost:3000/developers`;
  private http = inject(HttpClient);


  getDevelopers(): Observable<Developer[]> {
    return this.http.get<Developer[]>(this.API_URL);
  }

  getDeveloperById(id: number): Observable<Developer> {
    return this.http.get<Developer>(`${this.API_URL}/${id}`);
  }

  addDeveloper(developer: Developer): Observable<Developer> {
    return this.http.post<Developer>(this.API_URL, developer);
  }

  updateDeveloper(id: number, developer: Developer): Observable<Developer> {
    return this.http.put<Developer>(`${this.API_URL}/${id}`, developer);
  }

  deleteDeveloper(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
