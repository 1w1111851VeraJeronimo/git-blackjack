import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IDetalleUsuarioDto } from 'src/app/interfaces/security/i-detalle-usuario-dto';
import { ILoginUsuarioDto } from 'src/app/interfaces/security/i-login-usuario-dto';
import { IRegistrarUsuarioDto } from 'src/app/interfaces/security/i-registrar-usuario-dto';
import { environment } from '../../../environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private url = environment.apiBaseUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: IDetalleUsuarioDto;
  constructor(private httpClient: HttpClient) { }

  registrarUsuario(dto: IRegistrarUsuarioDto): Observable<IDetalleUsuarioDto> {
    return this.httpClient.post<IDetalleUsuarioDto>(`${this.url}Security/registrar`, dto);
  }

  login(dto: ILoginUsuarioDto) {
    return this.httpClient.post(`${this.url}Security/login`, dto)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user.user;
          }
        })
      );
  }

  loggedIn() {
    const token = localStorage.getItem('token') ?? undefined;
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
  }
}
