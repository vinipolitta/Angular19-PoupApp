import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TipoTransacao, Transacao } from '../../compartilhados/transacao.model';
import { DestaqueValorNumericoDirective } from '../../../compartilhados/destaque-valor-numerico.directive';

@Component({
  selector: 'app-transacao',
  imports: [CurrencyPipe, DatePipe, DestaqueValorNumericoDirective],
  templateUrl: './transacao.component.html',
  styleUrl: './transacao.component.css'
})
export class TransacaoComponent {
  transacao = input.required<Transacao>();

  valor = computed(() => {
    console.log(this.transacao().tipo);
    console.log(TipoTransacao.SAQUE);
    console.log(this.transacao().tipo === TipoTransacao.SAQUE || this.transacao().tipo === TipoTransacao.TRANSFERENCIA);
    if (this.transacao().tipo === TipoTransacao.SAQUE || this.transacao().tipo === TipoTransacao.TRANSFERENCIA) {
      return -this.transacao().valor;
    }

    return this.transacao().valor;
  });
}
