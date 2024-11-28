import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TableProjectsComponent } from '../table-projects/table-project.component';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-project',
  standalone: true,
  imports: [MatButtonModule, TableProjectsComponent],
  templateUrl: './list-project.component.html',
  styleUrl: './list-project.component.scss',
})
export class ListProjectComponent {
  constructor(public dialog: MatDialog) {}

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
}
