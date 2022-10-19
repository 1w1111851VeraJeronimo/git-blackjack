import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SecurityService } from '../../services/security/security.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  video!: string;
  playUrl: string = "/usuario/login";

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    if (this.loggedIn())
      this.playUrl = "/juego"

    this.video = '/assets/img/blackjackIntro.mp4';
  }

  alertaMantenimiento() {
    Swal.fire('Lo sentimos, el modulo aún esta en desarrollo.')
  }

  loggedIn() {
    return this.securityService.usuarioLogueado();
  }
}
