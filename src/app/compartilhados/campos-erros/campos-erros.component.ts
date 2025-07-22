import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-campos-erros',
  templateUrl: './campos-erros.component.html',
  styleUrl: './campos-erros.component.css'
})
export class CamposErrosComponent {
  @Input() control!: AbstractControl | null;
  @Input() messages: { [key: string]: string } = {};

  get errorMessages(): string[] {
    if (!this.control || !this.control.errors || !(this.control.dirty || this.control.touched)) {
      return [];
    }
    return Object.keys(this.control.errors).map(key => this.messages[key] || 'Erro inválido');
  }
}
