import type { LancamentoInput } from '@/types';

export type ErrosLancamento = Partial<Record<keyof LancamentoInput, string>>;

export function validarLancamento(dados: LancamentoInput, categorias: string[]): ErrosLancamento {
  const erros: ErrosLancamento = {};
  const descricao = dados.descricao.trim();

  if (!descricao) erros.descricao = 'Informe a descrição.';
  else if (descricao.length < 3) erros.descricao = 'Mínimo de 3 caracteres.';

  if (dados.valor === null || Number.isNaN(dados.valor)) erros.valor = 'Informe um valor válido.';
  else if (dados.valor <= 0) erros.valor = 'O valor deve ser maior que zero.';

  if (!dados.categoria) erros.categoria = 'Escolha uma categoria.';
  else if (!categorias.includes(dados.categoria)) erros.categoria = 'Categoria inválida.';

  if (!dados.data) erros.data = 'Informe a data.';

  return erros;
}

export function validarEmail(email: string): string | null {
  if (!email.trim()) return 'Informe o e-mail.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'E-mail inválido.';
  return null;
}

export function validarSenha(senha: string): string | null {
  if (!senha) return 'Informe a senha.';
  if (senha.length < 6) return 'A senha precisa ter pelo menos 6 caracteres.';
  return null;
}
