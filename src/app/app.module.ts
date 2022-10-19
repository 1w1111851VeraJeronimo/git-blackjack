import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MesaComponent } from './pages/black-jack/mesa/mesa.component';
import { CrupierComponent } from './pages/black-jack/crupier/crupier.component';
import { JugadorComponent } from './pages/black-jack/jugador/jugador.component';
import { HttpClientModule } from '@angular/common/http';
import { ReglasComponent } from './pages/reglas/reglas.component';
import { ListaComponent } from './pages/lista/lista.component';
import { HomeComponent } from './pages/home/home.component';
import { CartaComponent } from './pages/black-jack/carta/carta.component';
import { RegistroUsuarioComponent } from './security/registro-usuario/registro-usuario.component';
import { LoginComponent } from './security/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { NavbarComponent } from './pages/layout/navbar/navbar.component';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    MesaComponent,
    CrupierComponent,
    JugadorComponent,
    HomeComponent,
    ReglasComponent,
    ListaComponent,
    HomeComponent,
    CartaComponent,
    RegistroUsuarioComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
         tokenGetter: tokenGetter,
         allowedDomains : ['localhost:44353'],
         disallowedRoutes : ['localhost:44353/api/security']
      }
   })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
