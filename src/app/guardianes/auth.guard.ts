import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map, Observable} from "rxjs";

@Injectable()     //porque este servicio utiliza otros servicios
export class AuthGuard implements CanActivate{

  //atributos


  //constructor
  constructor(
    private afAuth : AngularFireAuth,
    private router : Router
  ) {
  }


  //métodos
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {

    //comprobamos si el usuario esta autenticado en el AngularFireAuth.authState()
  return this.afAuth.authState.pipe(
    map(auth => {
      if (!auth){  //si no contiene contiene ningun usuario autentificado entonces redireccionamos a login y devolvemos falso
        this.router.navigate(['/login']);
        return false;
      } else { // si se encontro usuario autentificado devolvemos true
        return true;
      }
    })
  )
  }

}
