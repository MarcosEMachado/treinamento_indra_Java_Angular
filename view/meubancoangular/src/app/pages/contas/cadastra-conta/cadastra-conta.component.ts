import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IClientes } from 'src/app/interfaces/clientes';
import { IContas } from 'src/app/interfaces/contas';
import { ClienteService } from 'src/app/services/cliente.service';
import { ContaService } from 'src/app/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastra-conta',
  templateUrl: './cadastra-conta.component.html',
  styleUrls: ['./cadastra-conta.component.css']
})
export class CadastraContaComponent implements OnInit {

  cliente: IClientes = {
    id: 0,
    cpf: '0',
    email: 'buscanco',
    nome: 'buscanco',
    observacoes: 'buscanco'
  };

  formValue: FormGroup = new FormGroup({
    id: new FormControl(null),
    agencia: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    numero: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    saldo: new FormControl('', Validators.required)
  });

  constructor(private clienteService: ClienteService,
    private contaService: ContaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const cpf = this.route.snapshot.paramMap.get('cpf');
    if (Number(cpf)) {
      this.clienteService.bucarClientCpf(String(cpf)).subscribe((result: IClientes) => {
        this.cliente = result;
      }, err => console.log(err));
    }
  }

  salvarConta() {
    const conta: IContas = this.formValue.value;
    conta.cliente = this.cliente;
    //console.log(conta);
    this.contaService.cadastrar(conta).subscribe((result: IContas) => {
      Swal.fire(`Conta cadastrada com sucesso id: ${result.id} para o cliente nome: ${result.cliente.nome}`);
      this.router.navigate(['/contas', result.cliente.cpf]);
    }, err => console.log(err));
  }

}
