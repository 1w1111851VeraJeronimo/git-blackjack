import { Component, Input, OnInit } from '@angular/core';
import { ICarta } from '../../../interfaces/i-carta';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

  @Input() carta: ICarta = {} as ICarta;
  pathImagenCarta: string =  "";

  constructor() { }

  ngOnInit(): void {
    this.pathImagenCarta = `https://res.cloudinary.com/dfyevp7g4/image/upload/v1665174817/blackjack/cards/${!this.carta.showBack ? this.carta.nombre != null ? this.carta.nombre+this.carta.categoria.codigo: this.carta.numero+this.carta.categoria.codigo : "Gray_back"}.jpg`;
  }
}
