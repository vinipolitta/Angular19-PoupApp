import { Component, input } from '@angular/core';
import { TransacaoComponent } from "./transacao/transacao.component";
import { Transacao } from '../compartilhados/transacao.model';
import { CardComponent } from '../compartilhados/card/card.component';
import { BotaoAdicionarTransacoesComponent } from './botao-adicionar-transacoes/botao-adicionar-transacoes.component';

@Component({
  selector: 'app-transacoes',
  imports: [TransacaoComponent, CardComponent, BotaoAdicionarTransacoesComponent],
  templateUrl: './transacoes.component.html',
  styleUrl: './transacoes.component.css'
})
export class TransacoesComponent {
  transacoes = input.required<Transacao[]>();
}
