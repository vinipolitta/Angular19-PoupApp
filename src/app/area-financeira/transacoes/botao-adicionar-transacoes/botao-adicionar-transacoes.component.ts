import { Component, effect, signal } from '@angular/core';
import { BotaoComponent } from '../../../compartilhados/botao/botao.component';
import { ModalComponent } from '../../../compartilhados/modal/modal.component';

@Component({
  selector: 'app-botao-adicionar-transacoes',
  imports: [BotaoComponent, ModalComponent],
  templateUrl: './botao-adicionar-transacoes.component.html',
  styleUrl: './botao-adicionar-transacoes.component.css'
})
export class BotaoAdicionarTransacoesComponent {

  aberto = signal(false);

  abrirModal() {
    this.aberto.set(true);
  }
}
