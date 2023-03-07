import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Cliente} from "../models/cliente.model";
import {map, Observable} from "rxjs";

/*
* El servicio AngularFirestoreCollection es un contenedor de los tipos
* CollectionReference y Query del SDK nativo de Firestore.
* Es un servicio genérico que le proporciona un conjunto de métodos fuertemente
* tipados para manipular y transmitir datos.
* Este servicio está diseñado para usarse como @Injectable().
*
* El servicio AngularFirestoreDocument es un contenedor del tipo DocumentReference
* del SDK nativo de Firestore. Es un servicio genérico que le proporciona un conjunto
* de métodos fuertemente tipados para manipular y transmitir datos.
* Este servicio está diseñado para usarse como @Injectable().
*
*
* */

@Injectable()
export class ClienteService {

  //atributos
  clientesCollection : AngularFirestoreCollection<Cliente>;   //coleccion de clientes formato firestore
  clienteDoc: AngularFirestoreDocument<Cliente>;              //cliente formato firestore
  clientes : Observable<Cliente[]>;
  cliente! : Observable<Cliente | null>;

  //constructor
  constructor(
    private db : AngularFirestore
  ) {
    // definir a que coleccion nos queremos conectar y en que orden va adevolver
    // los resultados Recordemos que nuestra BDD Firebase tiene 2 colecciones.
    this.clientesCollection = db.collection(
      'clientes', ref => ref.orderBy('nombre', 'asc'));
  }

  //métodos
  getClientes() : Observable<Cliente[]> {

    //obtener clientes
    /*
    * getClientes(): De la coleccion definida en clientesCollection el método
    * snapshotChanges() va a regresar la coleccion de clientes a la cual le
    * aplicamos el  método pipe() para recuperar cada cliente e iterar sobre el.
    * */
    this.clientes = this.clientesCollection.snapshotChanges().pipe( //iterar cada cliente que llega en bruto desde la BDD
      map( c => { //va a modificar cada cliente
        return c.map ( cDatos => {  //recibe las colecciones del cliente en formato nativo firebase el cual tiene en payload.doc.data() los campos nombre, apellido, email y saldo y en payload.doc.id el identificador unico. Con el map() va a convertir a tipo Cliente el retorno del cliente en bruto de la BDD
          const datos = cDatos.payload.doc.data() as Cliente; //Recupera nombre, apellido, email y saldo y con eso crea un Cliente de la coleccion data
          datos.id = cDatos.payload.doc.id;   //le asigna al cliente que creo el id que tiene este cliente en su coleccion id
          return datos    //fin de la modificacion del cliente en curso
        })
      })
    );
    return this.clientes  //devuelve el arreglo clientes ya habiendo dejado cada elemento en tipo Cliente
  }

  agregarCliente(cliente : Cliente){
    this.clientesCollection.add(cliente);
  }

  getCliente(id : string) : Observable<Cliente | null>{

    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map(accion => {
        if(!accion.payload.exists){
          return null;
        } else {
          const datos = accion.payload.data() as Cliente; //transforma el cliente de firebase a Cliente
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }

  modificarCliente(cliente : Cliente){
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  eliminarCliente(cliente : Cliente) {
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.delete();
  }
}
