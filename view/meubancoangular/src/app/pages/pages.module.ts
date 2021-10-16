import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemClientesComponent } from './clientes/listagem-clientes/listagem-clientes.component';
import { CadastroEdicaoClientesComponent } from './clientes/cadastro-edicao-clientes/cadastro-edicao-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { ListagemContasComponent } from './contas/listagem-contas/listagem-contas.component';
import { CaixaEletronicoComponent } from './contas/caixa-eletronico/caixa-eletronico.component';
import { CadastraContaComponent } from './contas/cadastra-conta/cadastra-conta.component';
import { ExtratoComponent } from './contas/extrato/extrato.component';




@NgModule({
  declarations: [
    ListagemClientesComponent,
    CadastroEdicaoClientesComponent,
    ListagemContasComponent,
    CaixaEletronicoComponent,
    CadastraContaComponent,
    ExtratoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
