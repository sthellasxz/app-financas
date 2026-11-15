import { ref, computed } from 'vue';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

const sessao = ref<Session | null>(null);
let inicializado: Promise<void> | null = null;

export function iniciarAuth(): Promise<void> {
  if (!inicializado) {
    inicializado = supabase.auth.getSession().then(({ data }) => {
      sessao.value = data.session;
      supabase.auth.onAuthStateChange((_e, nova) => (sessao.value = nova));
    });
  }
  return inicializado;
}

function traduzirErro(msg: string): string {
  if (/invalid login credentials/i.test(msg)) return 'E-mail ou senha incorretos.';
  if (/already registered/i.test(msg)) return 'Este e-mail já está cadastrado.';
  if (/email not confirmed/i.test(msg)) return 'Confirme seu e-mail antes de entrar.';
  return msg;
}

export function useAuth() {
  const usuario = computed(() => sessao.value?.user ?? null);
  const nome = computed(() => (usuario.value?.user_metadata?.nome as string) ?? usuario.value?.email ?? '');

  async function entrar(email: string, senha: string) {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha });
    if (error) throw new Error(traduzirErro(error.message));
  }

  async function cadastrar(nomeCompleto: string, email: string, senha: string): Promise<boolean> {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: senha,
      options: { data: { nome: nomeCompleto.trim() } },
    });
    if (error) throw new Error(traduzirErro(error.message));
    return data.session !== null; // false = precisa confirmar e-mail
  }

  async function sair() {
    await supabase.auth.signOut();
  }

  return { usuario, nome, entrar, cadastrar, sair };
}
