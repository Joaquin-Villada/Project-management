import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatIconModule, RouterModule, MatButtonModule, MatSidenavModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  pathsList: Path[] = [
    { name: 'Inicio', icon: 'home', url: '/' },
    { name: '<Desarrolladores>', icon: null, url: '/developers' },
    { name: 'Proyectos', icon: 'assignment', url: '/projects' },
  ];
  @Output() sidenavCloseEvent = new EventEmitter<boolean>();

  CloseSidenav(): void {
    this.sidenavCloseEvent.emit(false)
  }

}

interface Path {
  name: string;
  icon: string | null;
  url: string;
}
