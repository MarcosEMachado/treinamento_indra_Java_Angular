import { IClientes } from "./clientes";

export interface IContas {

  id: number;
  agencia: string
  cliente: IClientes;
  numero: number;
  saldo: number;

}
