import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDeposito } from 'src/app/interfaces/deposito';
import { ISaque } from 'src/app/interfaces/saque';
import { ITransferencia } from 'src/app/interfaces/transferencia';
import { ContaService } from 'src/app/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-caixa-eletronico',
  templateUrl: './caixa-eletronico.component.html',
  styleUrls: ['./caixa-eletronico.component.css']
})
export class CaixaEletronicoComponent implements OnInit {

  validarConta: boolean = true;

  formValueSaDe: FormGroup = new FormGroup({
    agencia: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    numeroConta: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    valor: new FormControl('', Validators.required)
  });

  formValueTransferencia: FormGroup = new FormGroup({
    agenciaDestino: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    agenciaOrigem: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    numeroContaDestino: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    numeroContaOrigem: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    valor: new FormControl('', Validators.required)
  });

  constructor(private contaService: ContaService,
    private router: Router) { }

  ngOnInit(): void {
  }

  fValidarConta() {
    if (this.formValueSaDe.value.agencia != '' && this.formValueSaDe.value.numeroConta != '') {
      this.contaService.validarConta(this.formValueSaDe.value.agencia, this.formValueSaDe.value.numeroConta).subscribe(result => {
        this.validarConta = false;
      }, err => {
        this.validarConta = true;
      })
    } else {
      this.validarConta = true;
    }
  }

  depositar() {
    if (this.formValueSaDe.valid) {
      const deposito: IDeposito = this.formValueSaDe.value;
      this.contaService.depositar(deposito).subscribe(result => {
        Swal.fire(`Depósito realizado com sucesso`);
        this.router.navigate(['/contas']);
      }, err => {
        console.log(err);
        Swal.fire('Erro ao tentar realizar o depósito',
          'Tente novamente mais tarde!',
          'error');
      });
    }
  }

  sacar() {
    if (this.formValueSaDe.valid) {
      const saque: ISaque = this.formValueSaDe.value;
      this.contaService.sacar(saque).subscribe(result => {
        Swal.fire(`Saque realizado com sucesso`);
        this.router.navigate(['/contas']);
      }, err => {
        console.log(err);
        Swal.fire('Erro ao tentar realizar o Saque',
          'Tente novamente mais tarde!',
          'error');
      });
    }
  }

  transferir() {
    if (this.formValueTransferencia.valid) {
      const transferencia: ITransferencia = this.formValueTransferencia.value;
      this.contaService.transferir(transferencia).subscribe(result => {
        Swal.fire(`Transferencia realizado com sucesso`);
        this.router.navigate(['/contas']);
      }, err => {
        console.log(err);
        Swal.fire('Erro ao tentar realizar a transferência',
          'Tente novamente mais tarde!',
          'error');
      });
    }

  }

}
