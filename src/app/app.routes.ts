import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ListDeveloperComponent } from './components/list-developer/list-developer/list-developer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListProjectComponent } from './components/list-project/list-project/list-project.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'developers', component: ListDeveloperComponent },
  { path: 'projects', component: ListProjectComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
