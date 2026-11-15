import type { TipoLancamento } from '@/types';

export const CATEGORIAS_RECEITA = ['Salário', 'Freelance', 'Investimentos', 'Outros'];
export const CATEGORIAS_DESPESA = ['Alimentação', 'Transporte', 'Moradia', 'Educação', 'Lazer', 'Saúde', 'Outros'];

export function categoriasPorTipo(tipo: TipoLancamento): string[] {
  return tipo === 'receita' ? CATEGORIAS_RECEITA : CATEGORIAS_DESPESA;
}

export const TABELA: Record<TipoLancamento, 'receitas' | 'despesas'> = {
  receita: 'receitas',
  despesa: 'despesas',
};
