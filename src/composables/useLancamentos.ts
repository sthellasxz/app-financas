import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { TABELA } from '@/constants/categorias';
import type { Lancamento, LancamentoInput, TipoLancamento } from '@/types';

export function useLancamentos(tipo: TipoLancamento) {
  const tabela = TABELA[tipo];
  const itens = ref<Lancamento[]>([]);
  const carregando = ref(false);
  const erro = ref<string | null>(null);

  async function listar() {
    carregando.value = true;
    erro.value = null;
    const { data, error } = await supabase.from(tabela).select('*').order('data', { ascending: false });
    carregando.value = false;
    if (error) {
      erro.value = 'Erro ao carregar: ' + error.message;
      return;
    }
    itens.value = (data ?? []).map((i) => ({ ...i, valor: Number(i.valor) }));
  }

  async function salvar(dados: LancamentoInput, id?: string) {
    const registro = { descricao: dados.descricao, valor: dados.valor, categoria: dados.categoria, data: dados.data };
    const { error } = id
      ? await supabase.from(tabela).update(registro).eq('id', id)
      : await supabase.from(tabela).insert(registro);
    if (error) throw new Error(error.message);
    await listar();
  }

  async function excluir(id: string) {
    const { error } = await supabase.from(tabela).delete().eq('id', id);
    if (error) throw new Error(error.message);
    itens.value = itens.value.filter((i) => i.id !== id);
  }

  return { itens, carregando, erro, listar, salvar, excluir };
}
