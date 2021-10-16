import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IExtrato } from 'src/app/interfaces/extrato';
import { ContaService } from 'src/app/services/conta.service';
import { OperacaoContaService } from 'src/app/services/operacao-conta.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  quantidadeDeDias: number = 7;
  extratos: IExtrato[] = [];
  saldo: number = 0.00;

  constructor(private operacaoContaService: OperacaoContaService,
    private contaService: ContaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const ag = this.route.snapshot.paramMap.get('ag');
    const cc = this.route.snapshot.paramMap.get('cc');
    if (Number(ag) && Number(cc)) {
      this.operacaoContaService.extratoPerildo(String(ag), String(cc), this.quantidadeDeDias).subscribe((result: IExtrato[]) => {
        this.extratos = result;
      }, err => {
        console.log(err);
        this.router.navigate(['/contas']);
      });
      this.contaService.validarConta(String(ag), Number(cc)).subscribe((result: number) => {
        this.saldo = result;
      }, err => {
        console.log(err);
        this.router.navigate(['/contas']);
      });
    } else {
      this.router.navigate(['/contas']);
    }
  }

  maisDias() {
    const ag = this.route.snapshot.paramMap.get('ag');
    const cc = this.route.snapshot.paramMap.get('cc');
    this.quantidadeDeDias += 7;
    this.operacaoContaService.extratoPerildo(String(ag), String(cc), this.quantidadeDeDias).subscribe((result: IExtrato[]) => {
      this.extratos = result;
    }, err => {
      console.log(err);
    });
  }

  extratosFull() {
    const ag = this.route.snapshot.paramMap.get('ag');
    const cc = this.route.snapshot.paramMap.get('cc');
    this.operacaoContaService.extratoFull(String(ag), String(cc)).subscribe((result: IExtrato[]) => {
      this.extratos = result;
    }, err => {
      console.log(err);
    });
  }

}
