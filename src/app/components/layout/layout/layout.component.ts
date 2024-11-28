import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatSidenavModule, RouterOutlet, SidenavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  sidenavBar: boolean = false

  sidenavOpenEvent(): void {
    this.sidenavBar = true

  }

  sidenavCloseEvent(): any {
    this.sidenavBar = false
  }

}
