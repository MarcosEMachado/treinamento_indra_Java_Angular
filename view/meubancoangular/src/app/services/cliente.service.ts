import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IClientes } from '../interfaces/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  endpoint = 'clientes';
  api = environment.api;

  constructor(private http: HttpClient) { }

  listarTodosClient(): Observable<IClientes[]> {
    return this.http.get<IClientes[]>(`${this.api}/${this.endpoint}/`);
  }

  cadastrar(cliente: IClientes) {
    return this.http.post<IClientes>(`${this.api}/${this.endpoint}/`, cliente);
  }

  remove(id: number) {
    return this.http.delete(`${this.api}/${this.endpoint}/${id}`);
  }

  bucarClient(id: number): Observable<IClientes> {
    return this.http.get<IClientes>(`${this.api}/${this.endpoint}/${id}`);
  }

  bucarClientCpf(cpf: string): Observable<IClientes> {
    return this.http.get<IClientes>(`${this.api}/${this.endpoint}/buscarPorCpf/${cpf}`);
  }
}
