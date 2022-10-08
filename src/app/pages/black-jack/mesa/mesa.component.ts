import { Component, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { CrupierComponent } from '../crupier/crupier.component';
import { JugadorComponent } from '../jugador/jugador.component';
import { CartaService } from '../../../services/carta.service';
import { ICrupier } from '../../../interfaces/i-crupier';
import { IJugador } from '../../../interfaces/i-jugador';
import { IswalMessageCommunicationDto } from '../../../interfaces/dtos/iswal-message-communication-dto';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
  fondo = '../../../../assets/img/background/Pano-transformedd.jpg';

  crupier!: ICrupier;
  jugador!: IJugador;
  private subscription: Subscription = new Subscription();
  @ViewChild(CrupierComponent) crupierComponent!: CrupierComponent;
  @ViewChild(JugadorComponent) jugadorComponent!: JugadorComponent;

 

  ngOnInit(): void {
    this.crupier = {} as ICrupier;
    this.jugador = {} as IJugador;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateCrupier(crupier: ICrupier) : void {
     Object.assign(this.crupier, crupier);
  }
 
  updateJugador(jugador: IJugador) : void {
    Object.assign(this.jugador, jugador);
    this.checkGrameStatus(this.jugador.score, this.crupier.score, this.jugador.score != 0 && this.crupier.score >= 17);
  }

  terminarJuego(param: any) : void {
    swal.fire({
        title: 'Esta seguro?',
        text: "Esta por de finalizar la partida.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    }).then((result) => {
        if (result.isConfirmed) {
          this.jugadorComponent.juegoEnCurso = false;
          this.crupierComponent.swipeCard();
          this.crupierComponent.completeMinRequiredScore();
          setTimeout(() => {
            this.checkGrameStatus(this.jugador.score, this.crupier.score, this.jugador.score != 0 && this.crupier.score != 0)
          }, 2000);
    }});
  }

  startNewGame(any: any) : void {
    this.crupierComponent.setCartaCrupier(2);
    this.jugadorComponent.solicitarNuevaCarta(2);
    this.jugadorComponent.juegoEnCurso = true;
  }

  checkGrameStatus(jugadorScore: number, crupierScore: number, ready: boolean) : void {
    
    if(jugadorScore > 21) {
      this.jugadorComponent.juegoEnCurso = false;
      this.displayErrors("¡Perdiste la partida! Superaste los 21 puntos.",  "¡Perdiste!");
      this.resetMesa();
    }

    if(jugadorScore < crupierScore && crupierScore < 21 && ready){
      if(this.crupier.score == 21 && ready){
        this.displayErrors("¡El Crupier hizo Black Jack!", "¡Perdiste!");
      } else {
        this.displayErrors("¡Perdiste la partida!. El crupier tiene mas puntos.", "¡Perdiste!");
      }       
      this.resetMesa();
    }

    if(jugadorScore > crupierScore && ready || crupierScore > 21 && ready){
      if(jugadorScore == 21 && ready){
        this.displaySuccess("¡Black Jack!", "¡Ganaste!");
      } else {
        this.displaySuccess("¡Felicitaciones!.", "¡Ganaste!");
      }      
      this.resetMesa();
    }

    if(jugadorScore == crupierScore && ready){
      this.displayWarning("¡Tenes el mismo puntaje que el crupier!", "¡Empate!"); 
      this.resetMesa();     
    }
  }

  resetMesa() : void {
    this.crupierComponent.resetCrupier();
    this.jugadorComponent.resetJugador();
    this.jugador = {} as IJugador;
    this.crupier = {} as ICrupier;
  }

  displaySwalMessage(dto: IswalMessageCommunicationDto) : void {
     if(dto.icon == "error"){
      this.displayErrors(dto.message, dto.title);
     }

     if(dto.icon = "warning"){
      this.displayWarning(dto.message, dto.title);
     }

     if(dto.icon = "success"){
      this.displaySuccess(dto.message, dto.title);
     }
  }

  displayErrors(errorMessage: string, title: string) : void {
    swal.fire({
      icon: 'error',
      title: title,
      text: errorMessage,
    });
  }

  displaySuccess(title: string, text: string) : void {
    swal.fire({
      icon: 'success',
      title: title,
      text: text,
      timer: 1500
    });
  }

  displayWarning(title: string, text: string) : void {
    swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      timer: 1500
    });
  }

}
