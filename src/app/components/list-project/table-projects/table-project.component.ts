import { Subscription } from 'rxjs';
import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { ProjectsService } from '../../../services/projects.service';
import { Project } from '../../../models/project.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataUpdateProjectsService } from '../../../services/data-update-projects.service';

@Component({
  selector: 'app-table-projects',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    DatePipe,
    MatSnackBarModule,
  ],
  templateUrl: './table-project.component.html',
  styleUrl: './table-project.component.scss',
})
export class TableProjectsComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  private _projectsService$ = inject(ProjectsService);
  private data$: DataUpdateProjectsService;
  private subscription1!: Subscription;
  private subscription2!: Subscription;
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  projects: Project[] = [];

  dataSource = new MatTableDataSource<Project>(this.projects);
  displayedColumns: string[] = [
    'name',
    'description',
    'startDate',
    'endDate',
    'creationDate',
    'updateDate',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public projectsData$: DataUpdateProjectsService) {
    this.data$ = projectsData$;
  }

  ngOnInit() {
    this.subscription1 = this._projectsService$
      .getProjects()
      .subscribe((projects: Project[]) => {
        this.projectsData$.projectsData = projects;
      });
    this.subscription1 = this.data$.projects.subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        this.dataSource.data = this.projects;
        this.dataSource.paginator = this.paginator;
      },
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteProject(id: number) {
    this.snackBar('Eliminando proyecto...', 1000);
    this.subscription2 = this._projectsService$.deleteProject(id).subscribe({
      next: () => {
        this.projectsData$.deleteProjectData = id;
        this.snackBar('Proyecto eliminado', 2000);
      },
      error: () => {
        this.snackBar('Error al eliminar proyecto', 2000);
      },
    });
  }

   snackBar(mensaje: string, time: number) {
    this._snackBar.open(mensaje, '', {
      duration: time,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  ngOnDestroy() {
    if (this.subscription1) {
      this.subscription1.unsubscribe();
      if (this.subscription2) {
        this.subscription2.unsubscribe;
      }
    }
  }
}
