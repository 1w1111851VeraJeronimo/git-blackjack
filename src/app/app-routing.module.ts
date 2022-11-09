import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesaComponent } from './pages/black-jack/mesa/mesa.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaComponent } from './pages/lista/lista.component';
import { ReglasComponent } from './pages/reglas/reglas.component';
import { AuthGuardService } from './security/guards/auth-guard.service';
import { LoginComponent } from './security/login/login.component';
import { RegistroUsuarioComponent } from './security/registro-usuario/registro-usuario.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'inicio', component: HomeComponent },
  { path: 'usuario/login', component: LoginComponent },
  { path: 'usuario/registro', component: RegistroUsuarioComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuardService],
    children: [
      { path: 'juego', component: MesaComponent },
      { path: 'reglas', component: ReglasComponent },
      { path: 'partidas', component: ListaComponent },
      { path: 'reportes', component: ReportesComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
