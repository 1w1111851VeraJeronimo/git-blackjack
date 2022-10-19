import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../../services/security/security.service';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private securityService: SecurityService, private router: Router) { }

  canActivate(): boolean {
    if (this.securityService.loggedIn()) {
      return true;
    }

    alertify.error('¡Para acceder a esta funcion debe loguearse!.');
    this.router.navigate(['/home']);
    return false;
  }
}
