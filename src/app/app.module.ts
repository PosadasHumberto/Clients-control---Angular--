import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule, SETTINGS } from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FlashMessagesModule } from "angular2-flash-messages";
import { FormsModule } from "@angular/forms";     //para poder hacer 2 way binding

import { environment } from "../environments/environment"; // Recuperar el objeto con los datos de la BDD de firebase

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import {ClienteService} from "./services/cliente.service";
import {LoginService} from "./services/login.service";
import {AuthGuard} from "./guardianes/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableroComponent,
    ClientesComponent,
    EditarClienteComponent,
    LoginComponent,
    RegistroComponent,
    ConfiguracionComponent,
    NoEncontradoComponent,
    PiePaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Inicializar el Modulo Fire con los parametros de configuracion de nuestra BDD Firebase
    AngularFireModule.initializeApp(environment.firestore, 'control-clientes'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot()

  ],
  providers: [ClienteService, LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
