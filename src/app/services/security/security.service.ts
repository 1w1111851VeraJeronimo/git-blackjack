import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IDetalleUsuarioDto } from 'src/app/interfaces/security/i-detalle-usuario-dto';
import { ILoginUsuarioDto } from 'src/app/interfaces/security/i-login-usuario-dto';
import { IRegistrarUsuarioDto } from 'src/app/interfaces/security/i-registrar-usuario-dto';
import { environment } from '../../../environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IJuego } from '../../interfaces/i-juego';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private url = environment.apiBaseUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser!: IDetalleUsuarioDto | null;
  currenGame!: IJuego | null;
  constructor(private httpClient: HttpClient, private router: Router) { }

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

  usuarioLogueado() {
    const token = localStorage.getItem('token') ?? undefined;
    return !this.jwtHelper.isTokenExpired(token);
  }

  desloguearUsuario() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('currentGame');
    this.decodedToken = null;
    this.currentUser = null;
    this.currenGame = null;
  }

  setCurrentGame(juego: IJuego) {
    this.currenGame = juego;
    localStorage.setItem('currentGame', JSON.stringify(juego));
  }

  removeCurrentGame() {
    localStorage.removeItem('currentGame');
    this.currenGame = null;
  }

  getUserFromLocalStorage(): IDetalleUsuarioDto {
    var value = localStorage.getItem('user') != null ? localStorage.getItem('user') : null;

    if (value == null)
      return {} as IDetalleUsuarioDto;

    return JSON.parse(value);
  }

  getGameFromLocalStorage(): IJuego {
    var value = localStorage.getItem('currentGame') != null ? localStorage.getItem('currentGame') : null;

    if (value == null)
      return {} as IJuego;

    return JSON.parse(value);
  }
}
