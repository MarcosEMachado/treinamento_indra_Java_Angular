import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IContas } from '../interfaces/contas';
import { IDeposito } from '../interfaces/deposito';
import { ISaque } from '../interfaces/saque';
import { ITransferencia } from '../interfaces/transferencia';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  endpoint = 'contas';
  api = environment.api;

  ///injetar o http client
  constructor(private http: HttpClient) { }

  listarTodosContas(): Observable<IContas[]> {
    return this.http.get<IContas[]>(`${this.api}${this.endpoint}/`);
  }

  buscarContaCpf(cpf: string): Observable<IContas[]> {
    return this.http.get<IContas[]>(`${this.api}${this.endpoint}/consultar-contas-cliente/${cpf}`);
  }

  cadastrar(conta: IContas) {
    return this.http.post<IContas>(`${this.api}${this.endpoint}/`, conta);
  }

  validarConta(agencia: string, numero: number): Observable<number> {
    return this.http.get<number>(`${this.api}${this.endpoint}/consultar-saldo/${agencia}/${numero}`);
  }

  depositar(deposito: IDeposito) {
    return this.http.post<IContas>(`${this.api}${this.endpoint}/deposito`, deposito);
  }

  sacar(saque: ISaque) {
    return this.http.post<IContas>(`${this.api}${this.endpoint}/saque`, saque);
  }

  transferir(transferencia: ITransferencia) {
    return this.http.post(`${this.api}${this.endpoint}/transferencia`, transferencia);
  }

}
