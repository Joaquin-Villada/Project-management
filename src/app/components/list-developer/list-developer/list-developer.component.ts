// import { Developer } from './../../../models/role.model';
import { DevelopersService } from './../../../services/developers.service';
import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { TableComponent } from '../table-dev/table.component';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { Developer } from './../../../models/developer.model';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataUpdateDevelopersService } from '../../../services/data-update-developers.service';

@Component({
  selector: 'app-list-developer',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatButtonModule,
    TableComponent,
    RouterModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './list-developer.component.html',
  styleUrl: './list-developer.component.scss',
})
export class ListDeveloperComponent implements OnInit {
  // Inyecto el servicio de desarrolladores para poder agregar un nuevo desarrollador
  private subscription!: Subscription;
  private subscription1!: Subscription;
  data$: Observable<Developer[]>;
  developers: Developer[] = [];
  private _snackBar = inject(MatSnackBar);
  _developersService$ = inject(DevelopersService);

  ngOnInit(): void {
    this.subscription = this.data$.subscribe((developers: Developer[]) => {
      this.developers = developers;
    });
  }

  constructor(
    public dialog: MatDialog,
    public developersData$: DataUpdateDevelopersService,
  ) {
    this.data$ = this.developersData$.developers;
  }
  // this.dataSource.paginator = this.paginator;
  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterFormComponent, {
      data: { message: 'Registrar desarrollador' },
      width: '100vw',
      height: '100vh',
      maxWidth: '900px',
      maxHeight: '400px',
      minHeight: '300px',
      minWidth: '800px',
    });

    // Aca lo agrego a la lista de desarrolladores
    dialogRef.afterClosed().subscribe((result: Developer) => {
      if (!result) return;
      // Chequeo que el mail no existe en la base de datos
      const existMail: Developer | undefined = this.developers.find(
        (developer) => developer.mail === result.mail,
      );
      if (existMail) {
        this.snackBar('El mail ya existe', 3000);
        return;
      }
      // Agrego el desarrollador y muestro un mensaje
      const developer: Developer = result;
      this.subscription1 = this._developersService$
        .addDeveloper(developer)
        .subscribe({
          next: (response) => {
            this.subscription = this._developersService$
              .getDevelopers()
              .subscribe((developers: Developer[]) => {
                this.developersData$.developersData = developers;
              });
            console.log('Desarrollador creado:', response);
            this.snackBar('Desarrollador creado', 3000);
          },
          error: (error) => {
            console.error('Error al crear desarrollador:', error); // Aquí se genera el error
          },
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
    if (this.subscription) {
      this.subscription.unsubscribe();
      if (this.subscription1) {
        this.subscription1.unsubscribe();
      }
    }
  }
}
