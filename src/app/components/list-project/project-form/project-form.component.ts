import { Developer } from './../../../models/developer.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, Inject, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { DevelopersService } from '../../../services/developers.service';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../../services/projects.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { DataUpdateProjectsService } from '../../../services/data-update-projects.service';
import { Task } from '../../../models/task.model';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
  ],
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatTabGroup,
    MatTab,
    MatSnackBarModule,
    MatDialogContent,
    MatChipsModule,
    MatCheckboxModule,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  private _developersService$ = inject(DevelopersService);
  private _projectsService$ = inject(ProjectsService);
  private _tasksService$ = inject(TasksService);
  private subscriptor!: Subscription;
  private subscriptor1!: Subscription;
  private subscriptor2!: Subscription;
  developers: Developer[] = [];
  tasks: Task[] = [];

  _snackBar: MatSnackBar = inject(MatSnackBar);

  formTask: FormGroup;
  formProjects: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ProjectFormComponent>,
    public projectsService: DataUpdateProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private form: FormBuilder,
  ) {
    this.formProjects = this.form.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required, this.dateValidator]],
      endDate: ['', this.dateValidator],
      idManager: ['', Validators.required],
      devsForm: [[] as Developer[]],
      tasks: [[] as Task[]],
    });
    this.formTask = this.form.group({
      tittle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      state: ['', [Validators.required]],
      idDeveloper: ['', Validators.required],

    });
  }

  sendDataProjects() {
    console.log(this.formProjects.value);
    this.snackBar('Creando proyecto...', 1000);
    // const project: AddProjectDto = this.formProjects.value;
    // this.subscriptor1 = this._projectsService$.addProject(project).subscribe({
    //   next: (Project) => {
    //     this.subscriptor1 = this._projectsService$
    //       .getProjects()
    //       .subscribe((projects: Project[]) => {
    //         console.log(projects);
    //         this.projectsService.projectsData = projects;
    //       });
    //     this.snackBar('Proyecto creado', 3000);
    //     this.dialogRef.close();
    //   },
    //   error: (error) => {
    //     this.snackBar('Error al crear el proyecto', 3000);
    //     this.dialogRef.close();
    //   },
    // });
  }

  addTask() {
    console.log(this.formTask.value);
    const task = this.formTask.value;
  }

  updateTask(developer: any, event: any): void {
    const selectedTasks = event.value;
    this.formProjects.get('tasks')?.setValue(selectedTasks);
    this.formProjects.get('devsForm')?.setValue(selectedTasks);
  }


  ngOnInit() {
    this.subscriptor = this._developersService$
      .getDevelopers()
      .subscribe((developers: Developer[]) => {
        this.developers = developers;
      });
    this.subscriptor2 = this._tasksService$.getTasks().subscribe({
      next: (tasks: Task[]) => {
      this.tasks = tasks;
      },
      error: (error) => {
      console.error('Error fetching tasks', error);
      },
    });
    }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const isValidDate = !isNaN(Date.parse(value));
    return isValidDate ? null : { invalidDate: true };
  }


  getArrayIndex(array: any[], value: any): number {
    const arrayplus = array.indexOf(value);
    return arrayplus
  }

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  goToNextTab(): void {
    if (this.tabGroup.selectedIndex !== null && this.tabGroup.selectedIndex < this.tabGroup._tabs.length - 1) {
      this.tabGroup.selectedIndex++;
    } }
   snackBar(mensaje: string, time: number) {
    this._snackBar.open(mensaje, '', {
      duration: time,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });}
  ngOnDestroy() {
    if (this.subscriptor) {
      this.subscriptor.unsubscribe();
    }
    if (this.subscriptor1) {
      this.subscriptor1.unsubscribe();
    }
  }
}
