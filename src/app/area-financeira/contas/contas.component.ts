import { Component, input } from '@angular/core';
import { BotaoComponent } from "../../compartilhados/botao/botao.component";
import { ContaComponent } from "./conta/conta.component";
import { Conta } from '../compartilhados/conta.model';
import { CardComponent } from '../compartilhados/card/card.component';

@Component({
  selector: 'app-contas',
  imports: [BotaoComponent, ContaComponent, CardComponent],
  templateUrl: './contas.component.html',
  styleUrl: './contas.component.css'
})
export class ContasComponent {
  contas = input.required<Conta[]>();
}
