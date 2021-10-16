import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContas } from 'src/app/interfaces/contas';
import { ContaService } from 'src/app/services/conta.service';

@Component({
  selector: 'app-listagem-contas',
  templateUrl: './listagem-contas.component.html',
  styleUrls: ['./listagem-contas.component.css']
})
export class ListagemContasComponent implements OnInit {

  contas: IContas[] = [];
  cpf: any;

  constructor(private contaService: ContaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cpf = this.route.snapshot.paramMap.get('cpf');
    if (Number(this.cpf)) {
      //console.log(cpf);
      //buscar a conta por cpf
      this.contaService.buscarContaCpf(String(this.cpf)).subscribe((result: IContas[]) => {
        this.contas = result;
      }, err => console.log(err));
    } else {
      this.dados();
    }
  }

  dados() {
    this.contaService.listarTodosContas().subscribe((result: IContas[]) => {
      this.contas = result;
    });
  }

}
