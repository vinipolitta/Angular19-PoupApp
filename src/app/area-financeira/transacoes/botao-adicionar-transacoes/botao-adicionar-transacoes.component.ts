import { Component, input, OnInit, output, signal } from '@angular/core';
import { BotaoComponent } from '../../../compartilhados/botao/botao.component';
import { ModalComponent } from '../../../compartilhados/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeyValuePipe } from '@angular/common';
import { TipoTransacao, Transacao } from '../../compartilhados/transacao.model';
import { CamposErrosComponent } from '../../../compartilhados/campos-erros/campos-erros.component';
import { Conta } from '../../compartilhados/conta.model';

@Component({
  selector: 'app-botao-adicionar-transacoes',
  imports: [BotaoComponent, ModalComponent, ReactiveFormsModule, KeyValuePipe, CamposErrosComponent],
  templateUrl: './botao-adicionar-transacoes.component.html',
  styleUrl: './botao-adicionar-transacoes.component.css'
})
export class BotaoAdicionarTransacoesComponent implements OnInit {

  transacaoCriada = output<Transacao>();
  contas = input.required<Conta[]>();

  aberto = signal(false);
  form!: FormGroup;
  tiposTransacao = TipoTransacao;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario();
  }


  formulario() {
    this.form = this.fb.group({
      nomeTransacao: ['', Validators.required],
      tipoTransacao: this.fb.group({
        tipo: ['', Validators.required],
      }),
      valorTransacao: ['', Validators.required],
      dataTransacao: ['', Validators.required],
      contaTransacao: ['', Validators.required],
    });
  }

  abrirModal() {
    this.aberto.set(true);
  }

  onSubmit() {
    // Converte o valor do tipo para o valor do enum, se necessário
    let tipo = this.form.value.tipoTransacao.tipo;
    if (Object.keys(TipoTransacao).includes(tipo)) {
      tipo = TipoTransacao[tipo as keyof typeof TipoTransacao];
    }

    const novaTransacao = new Transacao(
      this.form.value.nomeTransacao,
      tipo, // agora é "Saque", "Depósito", etc.
      Number(this.form.value.valorTransacao),
      this.form.value.dataTransacao,
      this.form.value.contaTransacao
    );
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      console.log("novaTransacao", novaTransacao);
      this.transacaoCriada.emit(novaTransacao);
      this.form.reset();
      this.aberto.set(false);
    }
  }
}
