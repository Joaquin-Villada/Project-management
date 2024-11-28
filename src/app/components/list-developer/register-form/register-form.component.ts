import { Role } from './../../../models/role.model';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  OnInit,
} from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  AddDeveloperDto,
  UpdateDevDto,
} from '../../../models/developer.model';
import { RoleService } from '../../../services/role.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-register-form',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
  ],
  imports: [
    MatFormFieldModule,
    MatLabel,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent implements OnInit {
  // Lista de roles
  private _roleService$ = inject(RoleService);
  private _snackBar = inject(MatSnackBar);
  roles$: Role[] = [];

  subscription!: Subscription;

  ngOnInit() {
    this.subscription = this._roleService$
      .getRoles()
      .subscribe((datos: Role[]) => {
        this.roles$ = datos;
      });
  }
  name: string = '';
  lastname: string = '';
  mail: string = '';
  role: number = 0;
  date: Date | undefined = undefined;
  dialogEdit: boolean;

  cleanForm(): void {
    this.name = '';
    this.lastname = '';
    this.mail = '';
    this.role = 0;
    this.date = undefined;
  }
  // Validator mail y fecha
  regExp: RegExp =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(com|org|net|edu\.ar)/g;

  validateMail(mail: string): boolean {
    return this.regExp.test(mail);
  }

  validateDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  // Desactivar boton

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  sendDeveloper() {
    if (this.dialogEdit) {
      if (
        !(
          this.name &&
          this.lastname &&
          this.role &&
          this.date &&
          this.validateDate(this.date) &&
          this.validateMail(this.mail)
        )
      ) {
        this.snackBar('Faltan datos...', 2000);
        return;
      }
      try {
        const fullName = `${this.name} ${this.lastname}`;
        const addDeveloper: AddDeveloperDto = {
          name: fullName,
          mail: this.mail,
          idRole: this.role,
          startDate: this.date,
        };
        this.dialogRef.close(addDeveloper);
        this.snackBar('Registrando desarrollador...', 1000);
      } catch (err) {
        this.snackBar('Error al registrar desarrollador', 3000);
      }
    } else {
      if (
        !(
          this.name &&
          this.lastname &&
          this.role &&
          this.validateMail(this.mail)
        )
      ) {
        this.snackBar('Faltan datos...', 2000);
        return;
      }
      try {
        const fullName = `${this.name} ${this.lastname}`;
        const updateDeveloper: UpdateDevDto = {
          name: fullName,
          mail: this.mail,
          idRole: this.role,
        };
        this.dialogRef.close(updateDeveloper);
        this.snackBar('Editando desarrollador...', 2000);
      } catch (err) {
        this.snackBar('Error al editar desarrollador', 3000);
      }
    }
  }

  // DIALOG
  constructor(
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { message: string; hideDatePicker: boolean },
  ) {
    this.dialogEdit = !data.hideDatePicker;
  }

  closeDialog(): any {
    this.dialogRef.close();
  }

  snackBar(mensaje: string, time: number) {
    this._snackBar.open(mensaje, '', {
      duration: time,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
