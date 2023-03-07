import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ConfiguracionService} from "../services/configuracion.service";
import {map, Observable} from "rxjs";

@Injectable()   //llama a otros services
export class ConfigGuard implements CanActivate{

  //atributos


  //constructor
  constructor(
    private router : Router,
    private configurationService : ConfiguracionService
  ) {
  }

  //métodos
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
    return this.configurationService.getConfiguracion().pipe(
      map(conf => {
        if(conf?.permitirRegistro){
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
  }
}

