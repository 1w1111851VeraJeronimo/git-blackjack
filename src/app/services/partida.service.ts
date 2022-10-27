import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IJuego } from '../interfaces/i-juego';
import { SecurityService } from './security/security.service';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  });

  private url = environment.apiBaseUrl;
  
  constructor(private httpClient: HttpClient,
    private securityService: SecurityService) { }
    
  getLatestGamesForUser(idUsuario: number) : Observable<IJuego[]> {
    return this.httpClient.get<IJuego[]>(`${this.url}Juego/getLatestGamesForUser/${idUsuario}`, {headers: this.headers});
  }
}
