import { Injectable } from '@angular/core';
import { ICarta } from '../interfaces/i-carta';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../environments/environment';
import { IRequestCartaDto } from '../interfaces/dtos/i-request-carta-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityService } from './security/security.service';

@Injectable({
  providedIn: 'root'
})
export class CartaService {
  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  });
  
  private url = environment.apiBaseUrl;
  
  constructor(private httpClient: HttpClient, private securityService: SecurityService) { }

  solicitarCartas(dto: IRequestCartaDto) : Observable<ICarta[]>{
    return this.httpClient.post<ICarta[]>(`${this.url}carta/solicitarCartas`, dto, { headers: this.headers});
  }

  solicitarCartaFinPartida(dto: any) : Observable<ICarta[]> {
    return this.httpClient.post<ICarta[]>(`${this.url}carta/solicitarCartaFinPartidaCrupier`, dto, { headers: this.headers});
  }
}
