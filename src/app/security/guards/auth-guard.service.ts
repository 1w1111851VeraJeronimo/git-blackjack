import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../../services/security/security.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private securityService: SecurityService, private router: Router) { }

  canActivate(): boolean {
    if (this.securityService.usuarioLogueado()) {
      return true;
    }

    this.displayErrors("¡Para acceder a esta funcion debe loguearse!.", "Error");
    this.router.navigate(['/home']);
    return false;
  }

  displayErrors(errorMessage: string, title: string): void {
    swal.fire({
      icon: 'error',
      title: title,
      text: errorMessage
    });
  }
}
