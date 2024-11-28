import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DevelopersService } from '../../../services/developers.service';
import { Developer } from '../../../models/developer.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProjectFormComponent } from '../../list-project/project-form/project-form.component';

@Component({
  selector: 'app-view-developer',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    DatePipe,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './view-developer.component.html',
  styleUrls: ['./view-developer.component.scss'],
})
export class ViewDeveloperComponent implements OnInit, OnDestroy {
  private _developerService$: DevelopersService = inject(DevelopersService);
  subscription!: Subscription;
  developer?: Developer;

  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      data: { message: 'Crear Nuevo Proyecto' },
      width: '1002px',
      height: '502px',
      minHeight: '502px',
      minWidth: '1002px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    const developerId = this.data.id;
    if (developerId) {
      this.subscription = this._developerService$
        .getDeveloperById(developerId)
        .subscribe(
          (developer: Developer) => {
            this.developer = developer;
            console.log(this.developer);
          },
          (error) => {
            console.error(
              'Error al obtener los datos del desarrollador:',
              error,
            );
          },
        );
    } else {
      console.error('ID de desarrollador no válido');
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
