import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesaComponent } from './pages/black-jack/mesa/mesa.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaComponent } from './pages/lista/lista.component';
import { ReglasComponent } from './pages/reglas/reglas.component';

const routes: Routes = [
  { path: 'mesa', component: MesaComponent },
  { path: 'inicio',component: HomeComponent },
  { path: 'reglas',component: ReglasComponent },
  { path: 'lista',component: ListaComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
