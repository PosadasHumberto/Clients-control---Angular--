import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map} from "rxjs";

@Injectable()   //porque va a requerir de otros servicios
export class LoginService {

  //atributos


  //constructor
  constructor(
    private authService : AngularFireAuth //Interface que permite autenticarse gracias al metodo SignWith....
  ) {
  }

  //métodos
  login(email : string, password : string) : Promise<any>{
    return new Promise((resolve, reject) => { //resolve trata el exito, reject el error
      this.authService.signInWithEmailAndPassword(email, password)
        .then(
          datos => resolve(datos),    //caso exito
          error => reject(error))     //caso error
    });
  }

  getAuth(){  //Método que nos va a permitir recuperar el usuario autenticado
    return this.authService.authState.pipe(
      map( auth => auth)
    )
  }

  logout() {
    this.authService.signOut();
  }

  /*Método que crea un nuevo usuario en Authentication de nuestra aplicacion
* de Firebase pudiendo asi hacer login*/
  registro(email : string, password : string) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, password)
        .then(
          datos => resolve(datos),
          error => reject(error));
    });
  }

}
