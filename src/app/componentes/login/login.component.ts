import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {LoginService} from "../../services/login.service";
import {resolve} from "@angular/compiler-cli";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //atributos
  email : string;
  password : string;

  //constructor
  constructor(
    private router : Router,
    private flashMessages : FlashMessagesService,
    private loginService : LoginService
  ) {
  }

  ngOnInit() {
    //para mostrar el formulario de conexion solo si el usuario
    //no ha iniciado sesion aun, primero hay que saber el estado
    //de LoginService.getauth() ya que si el usuario ya esta logueado
    //sera reenviado a la pagina de inicio.
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    })
  }

  //Métodos
  login(){
    this.loginService.login(this.email, this.password)
      .then(
        resolve => {
          this.router.navigate(['/']); //autenticacion correcta
      }).catch(e => this.flashMessages.show(
        e.message,
      {
        cssClass : 'alert-danger',
        timeout : 4000
      }
    ))
  }
}
