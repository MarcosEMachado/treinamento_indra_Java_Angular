import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IClientes } from 'src/app/interfaces/clientes';
import { ClienteService } from 'src/app/services/cliente.service';
///npm i sweetalert2 , depedencia para alerta
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadastro-edicao-clientes',
  templateUrl: './cadastro-edicao-clientes.component.html',
  styleUrls: ['./cadastro-edicao-clientes.component.css']
})
export class CadastroEdicaoClientesComponent implements OnInit {

  formValue: FormGroup = new FormGroup({
    id: new FormControl(null),
    cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    nome: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
    observacoes: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]),
    ativo: new FormControl(true, Validators.required)
  });

  ///ingeção de dependencias
  constructor(private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //buscar o parametro da rota no caso o id
    const id = this.route.snapshot.paramMap.get('id');
    if (Number(id)) {
      ///recebeu o id e é do tipo numerico
      //bucar o cliente pelo id
      this.clienteService.bucarClient(Number(id))
        .subscribe((result: IClientes) => {
          let clienteResult: IClientes = result;
          //console.log(clienteResult);
          //mandadno preencer da tela
          this.preencerForm(clienteResult);
        }, err => console.log(err));
    }
  }

  preencerForm(cliente: IClientes) {
    this.formValue = new FormGroup({
      id: new FormControl(cliente.id),
      cpf: new FormControl(cliente.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      email: new FormControl(cliente.email, [Validators.required, Validators.email]),
      nome: new FormControl(cliente.nome, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
      observacoes: new FormControl(cliente.observacoes, [Validators.required, Validators.minLength(5), Validators.maxLength(300)]),
      ativo: new FormControl(cliente.ativo)
    });
  }

  //ng-submite
  salvarCliente() {
    const cliente: IClientes = this.formValue.value;
    //console.log('cliente', cliente);
    //chamado o cadastrra do cliente do service
    this.clienteService.cadastrar(cliente).subscribe((result: IClientes) => {
      Swal.fire(`Clinente cadastrado com sucesso id: ${result.id} nome: ${result.nome}`);
      console.log(result);
      this.router.navigate(['/clientes']);
    }, err => console.log(err));
  }

}
