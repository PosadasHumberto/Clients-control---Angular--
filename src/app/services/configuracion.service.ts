import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Configuracion} from "../models/configuracion.model";
import {Observable} from "rxjs";

@Injectable() //consume otros servicios
export class ConfiguracionService {

  //atributos
  /*atributos necesarios de FireStore la BDD de FireBase*/
  configuracionDoc : AngularFirestoreDocument<Configuracion>;
  configuracion : Observable<Configuracion | undefined>;
  /*id unico de la coleccion de configuracion*/
  id : number = 1;

  //constructor
  constructor(
    private db : AngularFirestore
  ) {
  }

  //métodos
  getConfiguracion() : Observable<Configuracion | undefined> {
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracion = this.configuracionDoc.valueChanges();
    return this.configuracion;
  }

  modificarConfiguracion(configuracion : Configuracion) {
    //recuperamos la informacion
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);

    this.configuracionDoc.update(configuracion);//actualizamos la configuracion anterior
  }
}
