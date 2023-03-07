import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./componentes/login/login.component";
import {RegistroComponent} from "./componentes/registro/registro.component";
import {ConfiguracionComponent} from "./componentes/configuracion/configuracion.component";
import {EditarClienteComponent} from "./componentes/editar-cliente/editar-cliente.component";
import {TableroComponent} from "./componentes/tablero/tablero.component";
import {AuthGuard} from "./guardianes/auth.guard";
import {ConfigGuard} from "./guardianes/config.guard";

const routes: Routes = [
  {path:'', component: TableroComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'registrarse', component: RegistroComponent, canActivate : [ConfigGuard]},
  {path:'configuracion', component: ConfiguracionComponent, canActivate : [AuthGuard]},
  {path:'cliente/editar/:id', component: EditarClienteComponent, canActivate : [AuthGuard]},
  {path:'**', component: TableroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
