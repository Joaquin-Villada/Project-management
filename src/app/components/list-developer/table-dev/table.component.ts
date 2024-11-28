import { DevelopersService } from '../../../services/developers.service';
import { MatIconModule } from '@angular/material/icon';
import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { Developer } from '../../../models/developer.model';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewDeveloperComponent } from '../view-developer/view-developer.component';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataUpdateDevelopersService } from '../../../services/data-update-developers.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    DatePipe,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit, OnInit, OnDestroy {
  // Table
  private _snackBar = inject(MatSnackBar);
  private subscription!: Subscription;
  private subscription1!: Subscription;
  private subscription3!: Subscription;
  private data$: Observable<Developer[]>;
  private _developersService$ = inject(DevelopersService);
  developers: Developer[] = [];
  dataSource = new MatTableDataSource<Developer>(this.developers);
  displayedColumns: string[] = ['name', 'mail', 'role', 'startDate', 'actions'];

  constructor(
    public dialog: MatDialog,
    public developersService: DataUpdateDevelopersService,
  ) {
    this.data$ = this.developersService.developers;
  }

  ngOnInit(): void {
    this.subscription = this._developersService$.getDevelopers().subscribe(
      (developers: Developer[]) => {
        this.developersService.developersData = developers;
      },
      (error) => {
        console.error('Error fetching developers', error);
      },
    );

    this.subscription = this.data$.subscribe(
      (developers: Developer[]) => {
        this.developers = developers;
        this.dataSource.data = this.developers;
      },
      (error) => {
        console.error('Error fetching developers', error);
      },
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  deleteDev(id: number) {
    this.subscription3 = this._developersService$
      .deleteDeveloper(id)
      .subscribe({
        next: (data) => {
          this.developersService.deleteDeveloperData = id;
          this.snackBar('Desarrollador eliminado', 3000);
        },
        error: (error) => {
          this.snackBar('Error al eliminar desarrollador', 3000);
        },
      });
  }

  // DIALOG

  OpenDialogView(id: number): void {
    const dialogRef = this.dialog.open(ViewDeveloperComponent, {
      data: { id },
      width: '901px',
      height: '501px',
      minHeight: '501px',
      minWidth: '901px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDialogEdit(id: number): void {
    const dialogRef = this.dialog.open(RegisterFormComponent, {
      data: { message: 'Editar desarrollador', id: id, hideDatePicker: true },
      width: '100vw',
      height: '100vh',
      maxWidth: '900px',
      maxHeight: '400px',
      minHeight: '300px',
      minWidth: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const developerUpdate: Developer = result;
      const existMail: Developer | undefined = this.developers.find(
        (developer) => developer.mail === developerUpdate.mail,
      );
      if (existMail) {
        this.snackBar('El correo ya existe', 3000);
        return;
      }

      this.subscription1 = this._developersService$
        .updateDeveloper(id, developerUpdate)
        .subscribe((data) => {
          this.subscription = this._developersService$
            .getDevelopers()
            .subscribe((developers: Developer[]) => {
              this.developersService.developersData = developers;
            });
          console.log('Datos actualizados ' + data);
          this.snackBar('Desarrollador actualizado', 3000);
        });
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
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      if (this.subscription3) {
        this.subscription3.unsubscribe();
      }
    }
  }
}
