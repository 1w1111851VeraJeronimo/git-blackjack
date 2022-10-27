import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SecurityService } from '../../services/security/security.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  video!: string;
  private subscription: Subscription = new Subscription();
  public formularioRegistro!: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.createFormulario();
  }

  ngOnInit(): void {
    this.video = 'https://res.cloudinary.com/dfyevp7g4/video/upload/v1665177959/blackjack/video/blackjackIntro.mp4';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createFormulario() {
    this.formularioRegistro = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      fechaNacimiento: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : { 'mismatch': true };
  }

  registrarUsuario() {
    if (!this.formularioRegistro.valid)
      return;

    this.spinner.show();
    this.subscription.add(
      this.securityService.registrarUsuario(this.formularioRegistro.value).subscribe({
        next: (result) => { this.spinner.hide(); this.displaySuccessWithRedirect("Bienvenido", `Gracias por registrarte ${result.nombre}, ${result.apellido}`, "/usuario/login"); console.log(result); },
        error: (error) => { this.spinner.hide(); this.displayErrors(error.error, "Error"); console.log(error.error) }
      })
    )
  }

  cancelar() {
    this.formularioRegistro.reset();
    this.formularioRegistro.get('fechaNacimiento')?.patchValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
  }

  displayErrors(errorMessage: string, title: string): void {
    swal.fire({
      icon: 'error',
      title: title,
      text: errorMessage
    });
  }

  displaySuccessWithRedirect(title: string, text: string, redirectUrl: string): void {
    swal.fire({
      icon: 'success',
      title: title,
      text: text,
      timer: 5000
    }).then(() => {
      this.router.navigateByUrl(redirectUrl);
    });
  }
}
