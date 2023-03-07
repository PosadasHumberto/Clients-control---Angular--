import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{

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
    //si el usuario ya esta autenticado, navegamos a la pagina de inicio
    this.loginService.getAuth().subscribe( auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    })
  }

  //métodos
  registro(email : string, password : string) {
    this.loginService.registro(this.email, this.password) //este metodo del LoginService devuelve una promesa
      .then( resultado => {//caso de exito
        this.router.navigate(['/'])
      })
      .catch(error => { //caso de error
        this.flashMessages.show(
          error.message, {
            cssClass: 'alert-danger',
            timeout: 4000
          }
        );
      })
  }

}
