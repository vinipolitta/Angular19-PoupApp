import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenaPorData'
})
export class OrdenaPorDataPipe implements PipeTransform {
  transform(transacoes: any[], campoData: string = 'data'): any[] {
    if (!Array.isArray(transacoes)) return transacoes;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);

    const isSameDay = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    const hojeArr = [];
    const ontemArr = [];
    const outrasArr = [];

    for (const t of transacoes) {
      const data = new Date(t[campoData]);
      if (isSameDay(data, hoje)) {
        hojeArr.push(t);
      } else if (isSameDay(data, ontem)) {
        ontemArr.push(t);
      } else {
        outrasArr.push(t);
      }
    }

    // Ordena cada grupo do mais recente para o mais antigo
    const sortDesc = (a: any, b: any) =>
      new Date(b[campoData]).getTime() - new Date(a[campoData]).getTime();

    return [
      ...hojeArr.sort(sortDesc),
      ...ontemArr.sort(sortDesc),
      ...outrasArr.sort(sortDesc)
    ];
  }
}
