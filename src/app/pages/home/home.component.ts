import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  video!: string;

  constructor() { }

  ngOnInit(): void {
    this.video = '/assets/img/blackjackIntro.mp4';
  }

  alertaMantenimiento(){
    Swal.fire('Lo sentimos, el modulo aún esta en desarrollo.')
  }

}
