import { afterRender, Directive, ElementRef, input } from '@angular/core';

@Directive({
  selector: '[appDestaqueValorNumerico]',
})
export class DestaqueValorNumericoDirective {

  appDestaqueValorNumerico = input.required<number>();

  corPositva = input("var(--destaque-receita)");
  corNegativa = input("var(--destaque-despesa)");

  constructor(private el: ElementRef<HTMLElement>) {
    afterRender(() => {
      this.appDestaqueValorNumerico() > 0 ? 
      this.el.nativeElement.style.color = this.corPositva() : 
      this.el.nativeElement.style.color = this.corNegativa();
    });
  }


}
