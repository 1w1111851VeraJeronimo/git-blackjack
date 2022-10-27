import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICarta } from 'src/app/interfaces/i-carta';
import { CartaService } from '../../../services/carta.service';
import { ICrupier } from '../../../interfaces/i-crupier';
import { IswalMessageCommunicationDto } from '../../../interfaces/dtos/iswal-message-communication-dto';
import { CrupierService } from '../../../services/crupier.service';
import { IRequestCartaDto } from '../../../interfaces/dtos/i-request-carta-dto';
import { SecurityService } from 'src/app/services/security/security.service';

@Component({
  selector: 'app-crupier',
  templateUrl: './crupier.component.html',
  styleUrls: ['./crupier.component.css']
})
export class CrupierComponent implements OnInit {

  cartasCrupier: Array<ICarta> = [];
  score: number = 0;
  private subscription: Subscription = new Subscription();
  @Output() crupierEmitter = new EventEmitter<ICrupier>();
  @Output() swalMessageEventEmitter = new EventEmitter<IswalMessageCommunicationDto>();

  constructor(private cartaService: CartaService, private crupierService: CrupierService,
    private securityService: SecurityService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  completeMinRequiredScore(): void {
    this.setCartaCrupier(1, false, true);
  }

  setPreviousCards(cartas: ICarta[]){
    cartas.forEach(x => {
      this.cartasCrupier.push(x);
      this.updateScore();
    });
  }

  setFinPartida(emitEvent: boolean = true): void {
    let dto = { idJuego: this.securityService.getGameFromLocalStorage().id, idUsuario: this.securityService.getUserFromLocalStorage().id, scoreCrupier: this.score };

    this.subscription.add(
      this.cartaService.solicitarCartaFinPartida(dto).subscribe({
        next: (results) => { this.setNuevaCarta(results, emitEvent); },
        error: (error) => { this.swalMessageEventEmitter.emit({ message: error, title: "Oops...", icon: "error" } as IswalMessageCommunicationDto); }
      })
    );
  }

  setCartaCrupier(cantidad: number, emitEvent: boolean = true, isEndOfGame: boolean = false): void {
    let dto = { idJuego: this.securityService.getGameFromLocalStorage().id, idUsuario: this.securityService.getUserFromLocalStorage().id, cantidadCartasSolicitadas: cantidad, esCrupier: true } as IRequestCartaDto

    this.subscription.add(
      this.cartaService.solicitarCartas(dto).subscribe({
        next: (results) => {
          this.setNuevaCarta(results, emitEvent);

          if (isEndOfGame && this.score < 17) {
            this.completeMinRequiredScore();
          }

          if (isEndOfGame && this.score >= 17) {
            this.updateScore(true);
          }
        },
        error: (error) => { this.swalMessageEventEmitter.emit({ message: error, title: "Oops...", icon: "error" } as IswalMessageCommunicationDto); }
      })
    );
  }

  setNuevaCarta(cartas: ICarta[], emitEvent: boolean = true): void {
    let index = 1;
    cartas.forEach(x => {
      if (x.nombre == "A") {
        this.crupierService.getHazValue().subscribe({
          next: (result) => { x.valores.splice(x.valores.indexOf(result), 1); },
          error: (error) => { this.swalMessageEventEmitter.emit({ message: error, title: "Oops...", icon: "error" } as IswalMessageCommunicationDto); }
        });
      }

      if (index == 2) {
        x.showBack = true;
      }

      this.cartasCrupier.push(x);
      index++;
    });
    this.updateScore(emitEvent);
  }

  updateScore(emitEvent: boolean = true): void {
    this.score = 0;

    this.cartasCrupier.forEach((x) => {
      this.score += !x.showBack ? x.valores[0] : 0;
    });

    if (emitEvent) {
      this.crupierEmitter.emit({ id: 1, cartas: this.cartasCrupier, score: this.score } as ICrupier);
    }
  }

  swipeCard(): void {
    if (this.cartasCrupier.some(x => x.showBack)) {
      let cartaCopy = {} as ICarta;
      Object.assign(cartaCopy, this.cartasCrupier.find(x => x.showBack));
      this.cartasCrupier.splice(this.cartasCrupier.indexOf(cartaCopy), 1);
      cartaCopy.showBack = false;
      this.cartasCrupier.push(cartaCopy);
    }
    this.updateScore();
  }

  resetCrupier(): void {
    this.cartasCrupier = [];
    this.updateScore(false);
  }
}
