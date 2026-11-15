import type { Lancamento, Periodo } from '@/types';

const arredondar = (n: number) => Math.round(n * 100) / 100;

export function filtrarPorPeriodo(itens: Lancamento[], periodo: Periodo): Lancamento[] {
  return itens.filter(
    (i) => (!periodo.inicio || i.data >= periodo.inicio) && (!periodo.fim || i.data <= periodo.fim),
  );
}

export function somar(itens: Lancamento[]): number {
  return arredondar(itens.reduce((t, i) => t + Number(i.valor), 0));
}

export function somarPorCategoria(itens: Lancamento[]) {
  const mapa = new Map<string, number>();
  for (const i of itens) mapa.set(i.categoria, (mapa.get(i.categoria) ?? 0) + Number(i.valor));
  return [...mapa.entries()]
    .map(([categoria, total]) => ({ categoria, total: arredondar(total) }))
    .sort((a, b) => b.total - a.total);
}

export function totaisPorMes(receitas: Lancamento[], despesas: Lancamento[]) {
  const meses = new Map<string, { receitas: number; despesas: number }>();
  const pegar = (k: string) => {
    if (!meses.has(k)) meses.set(k, { receitas: 0, despesas: 0 });
    return meses.get(k)!;
  };
  for (const r of receitas) pegar(r.data.slice(0, 7)).receitas += Number(r.valor);
  for (const d of despesas) pegar(d.data.slice(0, 7)).despesas += Number(d.valor);
  return [...meses.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([mes, v]) => ({ mes, receitas: arredondar(v.receitas), despesas: arredondar(v.despesas) }));
}

export function percentualDespesas(receitas: number, despesas: number): number | null {
  if (receitas <= 0) return null;
  return arredondar((despesas / receitas) * 100);
}
