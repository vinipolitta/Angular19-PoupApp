import { Component, input, output } from '@angular/core';
import { TransacaoComponent } from "./transacao/transacao.component";
import { Transacao } from '../compartilhados/transacao.model';
import { CardComponent } from '../compartilhados/card/card.component';
import { BotaoAdicionarTransacoesComponent } from './botao-adicionar-transacoes/botao-adicionar-transacoes.component';
import { OrdenaPorDataPipe } from "../../compartilhados/ordena-por-data.pipe";
import { Conta } from '../compartilhados/conta.model';

@Component({
  selector: 'app-transacoes',
  imports: [TransacaoComponent, CardComponent, BotaoAdicionarTransacoesComponent, OrdenaPorDataPipe],
  templateUrl: './transacoes.component.html',
  styleUrl: './transacoes.component.css'
})
export class TransacoesComponent {
  transacaoCriada = output<Transacao>();
  transacoes = input.required<Transacao[]>();
  contas = input.required<Conta[]>();
}
