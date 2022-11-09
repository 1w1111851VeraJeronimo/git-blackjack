import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ReporteCantidadJuegosYJugadoresPorDia } from 'src/app/interfaces/dtos/reportes/i-reporte-cantidad-juegos-jugadores-por-dia';
import { IReporteIndicePartidaGanadasCrupier } from 'src/app/interfaces/dtos/reportes/i-reporte-indice-partida-ganadas-crupier';
import { ReporteService } from '../../services/reporte.service';
import { SecurityService } from '../../services/security/security.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  fondo = '../../../../assets/img/background/Pano-transformedd.jpg';
  private subscription: Subscription = new Subscription();
  reporte1Data: number[] = [];
  constructor(private reporteService: ReporteService, private securityService: SecurityService, private spinner: NgxSpinnerService) { }

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['', ''],
    datasets: [{
      data: [0, 0]
    }]
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [''],
    datasets: [
      { data: [0,0], label: '' },
      { data: [0,0], label: '' }
    ]
  };

  public barChartData2: ChartData<'bar'> = {
    labels: [''],
    datasets: [
      { data: [0,0], label: '' },
      { data: [0,0], label: '' }
    ]
  };

  ngOnInit(): void {
    this.spinner.show();
    this.subscription.add(
      this.reporteService.getIndiceDeVictoriaCrupier(this.securityService.getUserFromLocalStorage().id).subscribe({
        next: (result) => {
          console.log(result);
          this.reporte1Data.push(result.porcentajeCrupier);
          this.reporte1Data.push(result.porcentajeCrupier == 0 ? 0 : 100);
          this.pieChartData = {
            labels: ['Porcentaje Partidas Ganadas', 'Total Partidas'],
            datasets: [{
              data: this.reporte1Data
            }]
          }
          this.spinner.hide();
        },
        error: (error) => { console.log(error); this.spinner.hide(); }
      })
    )

    this.subscription.add(
      this.reporteService.cantidadJuegosYJugadoresPorDia().subscribe({
        next: (result) => {
          this.barChartData = {
            labels: [result.map(x => x.gameDate)],
            datasets: [
              { data: result.map(x => x.cantidadJuegos), label: 'Cantidad Juegos' },
              { data: result.map(x => x.cantidadJugadores), label: 'Cantidad Jugadores' }
            ]
          };
          this.spinner.hide();
        },
        error: (error) => { console.log(error); this.spinner.hide(); }
      })
    )

    this.subscription.add(
      this.reporteService.getReportePromedioPartidasBlackJack(this.securityService.getUserFromLocalStorage().id).subscribe({
        next: (result) => {
          this.barChartData2 = {
            labels: ['Partidas BlackJack Jugador', 'Partida BlackJack Crupier'],
            datasets: [
              { data: [result.promedioBlackJackCrupier], label: 'Crupier' },
              { data: [result.promedioBlackJackJugador], label: 'Jugador' }
            ]
          };
          this.spinner.hide();
        },
        error: (error) => { console.log(error); this.spinner.hide(); }
      })
    )
  }
}
