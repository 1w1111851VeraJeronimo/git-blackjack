import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reglas',
  templateUrl: './reglas.component.html',
  styleUrls: ['./reglas.component.css']
})
export class ReglasComponent implements OnInit {
  fondo = '/assets/img/fondoReglass.jpg';
  video = 'https://drive.google.com/file/d/117V3PSUD5x-vybR_dQ9Y-LJZ3k6oDLam/preview'; 
  constructor() { }

  ngOnInit(): void {
  }

}
