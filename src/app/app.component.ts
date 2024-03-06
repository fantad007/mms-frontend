import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mms-frontend';

  isOpen: boolean = true;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
