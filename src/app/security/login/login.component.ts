import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SecurityService } from '../../services/security/security.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  video!: string;
  private subscription: Subscription = new Subscription();
  public formularioLogin!: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router) {
    this.crearForm();
  }

  crearForm(): void {
    this.formularioLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.video = '/assets/img/blackjackIntro.mp4';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loguearUsuario(): void {
    this.subscription.add(
      this.securityService.login(this.formularioLogin.value).subscribe(next => {
        this.displaySuccess("Bienvenido", "Login exitoso!");
        this.router.navigate(['/juego']);
      }, error => {
        this.displayErrors('Error durante el logueo:' + error, "Error");
      })
    )
  }

  displayErrors(errorMessage: string, title: string): void {
    swal.fire({
      icon: 'error',
      title: title,
      text: errorMessage
    });
  }

  displaySuccess(title: string, text: string): void {
    swal.fire({
      icon: 'success',
      title: title,
      text: text,
      timer: 5000
    });
  }
}
