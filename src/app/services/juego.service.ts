import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IJuego } from '../interfaces/i-juego';
import { SecurityService } from './security/security.service';
import { map, Observable } from 'rxjs';
import { IUpdateCartaValueDto } from '../interfaces/dtos/i-update-carta-value-dto';
import { UpdateGameStatusRequestDto } from '../interfaces/dtos/i-update-game-status-request-dto';
import { IActiveGameSetupDto } from '../interfaces/dtos/i-active-game-setup-dto';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  });

  private url = environment.apiBaseUrl;
  
  constructor(private httpClient: HttpClient, private securityService: SecurityService) { }
  
  loadActiveGame(idUsuario: number) : Observable<IActiveGameSetupDto> {
    return this.httpClient.post<IActiveGameSetupDto>(`${this.url}Juego/loadActiveGame/${idUsuario}`, null, {headers: this.headers});
  }

  addJuego(idUsuario: number) : Observable<IJuego> {
    return this.httpClient.post<IJuego>(`${this.url}Juego/addJuego/${idUsuario}`, null, {headers: this.headers});
  }

  updateDetalleJuego(dto: IUpdateCartaValueDto) : Observable<any> {
    return this.httpClient.post<any>(`${this.url}Juego/updateValorCarta`, dto, {headers: this.headers});
  }

  updateGameStatus(dto: UpdateGameStatusRequestDto) : Observable<any> {
    return this.httpClient.post<any>(`${this.url}Juego/updateGameStatus`, dto, {headers: this.headers});
  }
}