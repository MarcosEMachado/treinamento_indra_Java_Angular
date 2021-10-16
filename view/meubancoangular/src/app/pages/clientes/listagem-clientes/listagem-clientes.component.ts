import { Component, OnInit } from '@angular/core';
import { IClientes } from 'src/app/interfaces/clientes';
import Swal from 'sweetalert2';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-listagem-clientes',
  templateUrl: './listagem-clientes.component.html',
  styleUrls: ['./listagem-clientes.component.css']
})
export class ListagemClientesComponent implements OnInit {

  clientes: IClientes[] = [];

  constructor(private clientesService: ClienteService) { }

  ngOnInit(): void {
    this.dados();
  }

  dados() {
    this.clientesService.listarTodosClient().subscribe((result: IClientes[]) => {
      this.clientes = result;
    });
  }

  remove(id: number) {
    Swal.fire({
      title: 'Remover o cliente ?',
      text: `Cliente do id: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remover'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.clientesService.remove(id).subscribe(result => {
            this.dados();
            Swal.fire('Deletado com sucesso !!!');
          }, err => console.log(err));
          console.log(id);
          Swal.fire('Erro ao tentar remover o cliente',
            'Verifique se o client possui alguma conta',
            'error')
        }
      });

  }

}
