import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatSidenavModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() sidenavOpenEvent = new EventEmitter<boolean>();

    OpenSidenav(): void {
      this.sidenavOpenEvent.emit()
    }

  pathsList: Path[] = [
    { name: 'Inicio', icon: 'home', url: '/' },
    { name: '<Desarrolladores>', icon: null, url: '/developers' },
    { name: 'Proyectos', icon: 'assignment', url: '/projects' },
  ];
}

interface Path {
  name: string;
  icon: string | null;
  url: string;
}
