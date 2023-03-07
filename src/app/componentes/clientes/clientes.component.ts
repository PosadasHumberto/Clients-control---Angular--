import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClienteService} from "../../services/cliente.service";
import {Cliente} from "../../models/cliente.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  //atributos
  @ViewChild('clienteform')
  clienteform : NgForm; //atributo que nos va a permitir acceder al forulario dentro del modal para limpiar sus valores una vez que se ha guardado el cliente en la BDD

  @ViewChild('botonCerrar')
  botonCerrar : ElementRef; //atributo que nos permite acceder al boton cerrar de la ventana modal para cerrarla una vez que el cliente se ha agregado a la BDD

  clientes : Cliente[];
  cliente : Cliente = {
    nombre : '',
    apellido : '',
    email : '',
    saldo : 0
  }


  //constructores
  constructor(
    private clienteService : ClienteService,
    private flashMessages : FlashMessagesService
  ) {

  }

  ngOnInit() {
    //inicializar el arreglo de clientes con los elementos de la BDD pasando por el service
    this.clienteService.getClientes().subscribe(
      ctes => {
        this.clientes = ctes
      }
    )

  }

  //métodos
  getSaldoTotal() : number {
    let saldo : number = 0;
    if (this.clientes) {
      this.clientes.forEach(c => saldo += c.saldo!
      )}
    return saldo
  }

  agregar(clienteForm : NgForm){

    if (!clienteForm.valid){
      this.flashMessages.show('Merci de remplir le formulaire correctement.',
        {
          cssClass : 'alert-danger',
          timeout : 4000
        })

    } else {
      this.clienteService.agregarCliente(clienteForm.value);  //agregar cliente a la BDD pasando por el ClienteService
      this.clienteform.resetForm();   //vaciar el formulario
      this.botonCerrar.nativeElement.click(); //cerrar la ventana modal
    }
  }
}
