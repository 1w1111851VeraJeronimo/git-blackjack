import { Component } from '@angular/core';
import { SecurityService } from './services/security/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'TPIdabd';

  constructor(private securityService: SecurityService) {}

  loggedIn() {
    return this.securityService.usuarioLogueado();
  }
}
