import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../models/cliente.model";
import {ClienteService} from "../../services/cliente.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit{

  //atributos
  id : string;
  cliente : Cliente = {
    nombre : '',
    apellido : '',
    email : '',
    saldo : 0
  }

  //constructor
  constructor(
    private clienteService : ClienteService,
    private flashMessages : FlashMessagesService,
    private router : Router,      //permite hacer redirecciones
    private route : ActivatedRoute  //permite recuperar atributos del URL
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clienteService.getCliente(this.id).subscribe(
      c => {
        this.cliente.id = c?.id;
        this.cliente.nombre = c?.nombre;
        this.cliente.apellido = c?.apellido;
        this.cliente.email = c?.email;
        this.cliente.saldo = c?.saldo;
      }
    )
  }

  //métodos
  guardar(clienteForm : NgForm){
      if (!clienteForm.valid){
        this.flashMessages.show(
          'Merci de remplir le formulaire correctement',
          {
            cssClass : 'alert-danger',
            timeout : 4000
          }
        )
      } else {
        clienteForm.value.id = this.id;
        this.clienteService.modificarCliente(clienteForm.value);
        this.router.navigate(['/']);
      }
  }

  eliminar(){
    if(confirm('Voulez-vous vraiment supprimer le client?')){
      this.clienteService.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }
}
