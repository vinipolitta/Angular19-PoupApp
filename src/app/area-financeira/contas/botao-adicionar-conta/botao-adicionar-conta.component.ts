import { Component, OnInit, output, signal } from '@angular/core';
import { BotaoComponent } from "../../../compartilhados/botao/botao.component";
import { ModalComponent } from "../../../compartilhados/modal/modal.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CamposErrosComponent } from '../../../compartilhados/campos-erros/campos-erros.component';
import { Conta } from '../../compartilhados/conta.model';

@Component({
  selector: 'app-botao-adicionar-conta',
  imports: [BotaoComponent, ModalComponent, ReactiveFormsModule, CamposErrosComponent],
  templateUrl: './botao-adicionar-conta.component.html',
  styleUrl: './botao-adicionar-conta.component.css'
})
export class BotaoAdicionarContaComponent implements OnInit {

  contaCriada = output<Conta>();
  aberto = signal(false);
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario();
  }

  formulario() {
    this.form = this.fb.group({
      nomeConta: ['', Validators.required],
      valorConta: ['', Validators.required],
    });
  }

  onSubmit() {
    const conta = new Conta(this.form.value.nomeConta, this.form.value.valorConta);
    this.contaCriada.emit(conta);
    this.aberto.set(false);
  }

  abrirModal() {
    this.aberto.set(true);
  }

}
