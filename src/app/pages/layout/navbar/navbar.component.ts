import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../../services/security/security.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public securityService: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
  }

  desloguearUsuario() {
    if (this.usuarioLogueado()) {
      swal.fire({
        icon: 'success',
        title: "Hasta Luego!",
        text: "Usted ha  sided deslogueado de black jack app.",
        timer: 5000
      }).then(() => {
        this.securityService.desloguearUsuario();
        this.router.navigateByUrl("/inicio");
      });
    }
  }

  usuarioLogueado() {
    return this.securityService.usuarioLogueado();
  }
}
