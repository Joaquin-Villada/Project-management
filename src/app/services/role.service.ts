import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  http = inject(HttpClient);

  API_URL = 'http://localhost:3000/roles';

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.API_URL);
  }
  constructor() { }
}
