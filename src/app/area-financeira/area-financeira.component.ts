import { Component, computed, output, signal } from '@angular/core';
import { SaldoComponent } from "./saldo/saldo.component";
import { TransacoesComponent } from "./transacoes/transacoes.component";
import { ContasComponent } from "./contas/contas.component";
import { Conta } from './compartilhados/conta.model';
import { Transacao, TipoTransacao } from './compartilhados/transacao.model';

@Component({
  selector: 'app-area-financeira',
  imports: [SaldoComponent, TransacoesComponent, ContasComponent],
  templateUrl: './area-financeira.component.html',
  styleUrl: './area-financeira.component.css'
})
export class AreaFinanceiraComponent {

  saldo = computed(() => {
    return this.contas().reduce((acc, conta) => {
      return acc + conta.saldo;
    }, 0);
  });
  
  contasComSaldoInicial = signal<Conta[]>([]);

  contas = computed(() => {
    return this.contasComSaldoInicial().map(conta => {
      const saldoAtualizado = this.calculaSaldoAtualizado(conta);

      return {
        ...conta,
        saldo: saldoAtualizado
      }
    })
  });

  calculaSaldoAtualizado(contaInicial: Conta) {
    const transacoesDaConta = this.transacoes().filter(transacao => { return transacao.conta === contaInicial.nome });
    const saldoInicial = contaInicial.saldo;
    const saldoFinal = transacoesDaConta.reduce((acc, transacao) => {
      
      switch (transacao.tipo) {
        case TipoTransacao.DEPOSITO:
          return acc + transacao.valor;
        case TipoTransacao.SAQUE:
        case TipoTransacao.TRANSFERENCIA:
          return acc - transacao.valor;
        default:
          transacao.tipo satisfies never;
          throw new Error('Tipo de transação não suportado');
      }
    }, saldoInicial);
    return saldoFinal;
  }

  transacoes = signal<Transacao[]>([]);

  onTransacaoCriada($event: Transacao) {
    this.transacoes.update(transacoes => [...transacoes, $event]);
  }

  onContaCriada($event: Conta) {
    this.contasComSaldoInicial.update(contas => [...contas, $event]);
  }
}
