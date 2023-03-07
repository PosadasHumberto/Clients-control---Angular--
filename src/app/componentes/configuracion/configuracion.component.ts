import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ConfiguracionService} from "../../services/configuracion.service";
import {Configuracion} from "../../models/configuracion.model";

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit{

  //atributos
  permitirRegistro : boolean | undefined = false;

  //constructor
  constructor(
    private router : Router,
    private configuracionService : ConfiguracionService
  ) {
  }

  ngOnInit() {
    this.configuracionService.getConfiguracion()  //regresa un observable
      .subscribe((config : Configuracion | undefined) => {
        this.permitirRegistro = config?.permitirRegistro; //inicializa el atributo permitirRegistro con el contenido del atributo del mismo nombre en la coleccion cofiguracion de Firestore
      } )
  }

  //métodos
  guardar() {
    //crear un objet de tipo Configuracion e inicializarlo con el valor de permitirRegistro
    let config : Configuracion = { permitirRegistro : this.permitirRegistro };
    this.configuracionService.modificarConfiguracion(config); //modificar la configuracion en el ConfiguracionService con la configuracion actual
    this.router.navigate(['/']);
  }
}
