import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroEdicaoClientesComponent } from './pages/clientes/cadastro-edicao-clientes/cadastro-edicao-clientes.component';
import { ListagemClientesComponent } from './pages/clientes/listagem-clientes/listagem-clientes.component';
import { CadastraContaComponent } from './pages/contas/cadastra-conta/cadastra-conta.component';
import { CaixaEletronicoComponent } from './pages/contas/caixa-eletronico/caixa-eletronico.component';
import { ExtratoComponent } from './pages/contas/extrato/extrato.component';
import { ListagemContasComponent } from './pages/contas/listagem-contas/listagem-contas.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/clientes', pathMatch: 'full'
  },
  {
    path: 'clientes', component: ListagemClientesComponent
  },
  {
    path: 'contas', component: ListagemContasComponent
  },
  {
    path: 'clientes/cadastrar', component: CadastroEdicaoClientesComponent
  },
  {
    path: 'clientes/editar/:id', component: CadastroEdicaoClientesComponent
  },
  {
    path: 'contas/atm', component: CaixaEletronicoComponent
  },
  {
    path: 'contas/:cpf', component: ListagemContasComponent
  },
  {
    path: 'contas/nova/:cpf', component: CadastraContaComponent
  },
  {
    path: 'contas/extrato/:ag/:cc', component: ExtratoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
