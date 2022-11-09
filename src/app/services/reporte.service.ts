import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReporteCantidadJuegosYJugadoresPorDia } from '../interfaces/dtos/reportes/i-reporte-cantidad-juegos-jugadores-por-dia';
import { IReporteIndicePartidaGanadasCrupier } from '../interfaces/dtos/reportes/i-reporte-indice-partida-ganadas-crupier';
import { IReportePromedioPartidasBlackJack } from '../interfaces/dtos/reportes/i-reporte-promedio-partidas-black-jack';
import { SecurityService } from './security/security.service';

@Injectable({
    providedIn: 'root'
})
export class ReporteService {

    headers = new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
    });

    private url = environment.apiBaseUrl;

    constructor(private httpClient: HttpClient,
        private securityService: SecurityService) { }

    getIndiceDeVictoriaCrupier(idUsuario: number): Observable<IReporteIndicePartidaGanadasCrupier> {
        return this.httpClient.get<IReporteIndicePartidaGanadasCrupier>(`${this.url}Reporte/getIndiceDeVictoriaCrupier/${idUsuario}`, { headers: this.headers });
    }

    cantidadJuegosYJugadoresPorDia() : Observable<ReporteCantidadJuegosYJugadoresPorDia[]> {
        return this.httpClient.get<ReporteCantidadJuegosYJugadoresPorDia[]>(`${this.url}Reporte/cantidadJuegosYJugadoresPorDia`, { headers: this.headers })
    }

    getReportePromedioPartidasBlackJack(idUsuario: number) : Observable<IReportePromedioPartidasBlackJack> {
        return this.httpClient.get<IReportePromedioPartidasBlackJack>(`${this.url}Reporte/getReportePromedioPartidasBlackJack/${idUsuario}`, { headers: this.headers })
    }
}
