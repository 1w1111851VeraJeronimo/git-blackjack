import { Output, EventEmitter, Component, OnInit } from '@angular/core';
import { ICarta } from 'src/app/interfaces/i-carta';
import { Subscription } from 'rxjs';
import { CartaService } from '../../../services/carta.service';
import { IJugador } from '../../../interfaces/i-jugador';
import { IswalMessageCommunicationDto } from '../../../interfaces/dtos/iswal-message-communication-dto';
import swal from 'sweetalert2';
import { IRequestCartaDto } from 'src/app/interfaces/dtos/i-request-carta-dto';
import { SecurityService } from 'src/app/services/security/security.service';
import { JuegoService } from '../../../services/juego.service';
import { IUpdateCartaValueDto } from '../../../interfaces/dtos/i-update-carta-value-dto';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {

  cartasJugador: Array<ICarta> = [];
  juegoSeparado: Array<ICarta> = [];
  juegoEnCurso: boolean = false;
  score: number = 0;
  private subscription: Subscription = new Subscription();
  @Output() jugadorEventEmitter = new EventEmitter<IJugador>();
  @Output() startNewGameEventEmiter = new EventEmitter<any>();
  @Output() terminarJuegoEventEmitter = new EventEmitter<any>();
  @Output() swalMessageEventEmitter = new EventEmitter<IswalMessageCommunicationDto>();

  constructor(private cartaService: CartaService,
    private juegoService: JuegoService,
    private securityService: SecurityService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  solicitarNuevaCarta(cantidad: number): void {
    let dto = { idJuego: this.securityService.getGameFromLocalStorage().id, idUsuario: this.securityService.getUserFromLocalStorage().id, cantidadCartasSolicitadas: cantidad } as IRequestCartaDto;
    if (this.score > 21) {
      this.swalMessageEventEmitter.emit({ message: "Las reglas no permiten que solicites mas cartas!", title: "Accion no permitida", icon: "warning" } as IswalMessageCommunicationDto);
      return;
    }

    this.subscription.add(
      this.cartaService.solicitarCartas(dto).subscribe({
        next: (results) => { this.setNuevaCarta(results); },
        error: (error) => { this.swalMessageEventEmitter.emit({ message: error, title: "Oops...", icon: "error" } as IswalMessageCommunicationDto); }
      }));
  }

  setNuevaCarta(cartas: ICarta[]): void {
    cartas.forEach(x => {
      if (x.nombre == "A") {
        swal.fire({
          title: "Que valor quiere darle a la carta?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Once (11)",
          denyButtonText: "Uno (1)",
        }).then((result) => {
          if (result.isConfirmed) {
            this.subscription.add(
              this.juegoService.updateDetalleJuego({ valorSolicitado: 11, idCarta: x.id, idJuego: this.securityService.getGameFromLocalStorage().id, idUsuario: this.securityService.getUserFromLocalStorage().id } as IUpdateCartaValueDto).subscribe({
                next: (result) => {
                  x.valores.splice(x.valores.indexOf(1), 1);
                  this.cartasJugador.push(x);
                  this.updateScore();
                },
                error: (error) => { console.log(error); }
              })
            )
          } else if (result.isDenied) {
            this.subscription.add(
              this.juegoService.updateDetalleJuego({ valorSolicitado: 1, idCarta: x.id, idJuego: this.securityService.getGameFromLocalStorage().id, idUsuario: this.securityService.getUserFromLocalStorage().id } as IUpdateCartaValueDto).subscribe({
                next: (result) => {
                  x.valores.splice(x.valores.indexOf(11), 1);
                  this.cartasJugador.push(x);
                  this.updateScore();
                },
                error: (error) => { console.log(error); }
              })
            )
          }
        });
      } else {
        this.cartasJugador.push(x);
        this.updateScore();
      }
    });
  }

  updateScore(emitEvent: boolean = true): void {
    this.score = 0;
    this.cartasJugador.forEach((x) => {
      this.score += x.valores[0];
    });

    if (emitEvent) {
      this.jugadorEventEmitter.emit({ id: 1, nombre: "Test", apellido: "Test", score: this.score, cartas: this.cartasJugador } as IJugador);
    }
  }

  retirarseDelJuego(): void {
    this.terminarJuegoEventEmitter.emit();
  }

  startNewGame(): void {
    this.startNewGameEventEmiter.emit();
  }

  resetJugador(): void {
    this.cartasJugador = [];
    this.updateScore(false);
  }
}
