export type TipoLancamento = 'receita' | 'despesa';

export interface Lancamento {
  id: string;
  descricao: string;
  valor: number;
  categoria: string;
  data: string; // AAAA-MM-DD
  user_id: string;
}

export interface LancamentoInput {
  descricao: string;
  valor: number | null;
  categoria: string;
  data: string;
}

export interface Periodo {
  inicio: string | null;
  fim: string | null;
}
