import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  //atributos
  isLogged : boolean;
  loggedUser : string | null;

  //constructor
  constructor(
    private loginService : LoginService,
    private router : Router
  ) {
  }

  ngOnInit() {
    //verificar si el ususario esta autenticad
    this.loginService.getAuth().subscribe( auth => {
      if (auth){
        this.isLogged = true;
        this.loggedUser = auth.email;
      }
      else {
        this.isLogged = false;
      }
    })
  }

  //métodos
  logout(){
    this.loginService.logout();
    this.isLogged = false;
    this.router.navigate(['/']).then(()=>{
      window.location.reload();
    })  //despues de redirigir, recarga la pagina para
    // que los datos de la lista de clientes desaparezcan
  }

}
