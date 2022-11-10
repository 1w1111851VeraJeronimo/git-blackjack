import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../../services/juego.service';
import { SecurityService } from '../../services/security/security.service';
import { PartidaService } from '../../services/partida.service';
import { IJuego } from '../../interfaces/i-juego';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  fondo = '../../../../assets/img/background/Pano-transformedd.jpg';
  private subscription = new Subscription();
  juegos!: IJuego[];

  constructor(private partidaService: PartidaService, private securityService: SecurityService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadListing();
  }

  loadListing(): void {
    this.spinner.show();
    this.subscription.add(this.partidaService.getLatestGamesForUser(this.securityService.getUserFromLocalStorage().id).subscribe({
      next: (result) => { this.juegos = result; this.spinner.hide(); console.log(result); },
      error: (error) => { console.log(error); this.spinner.hide(); }
    })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
