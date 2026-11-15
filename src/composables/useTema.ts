import { ref } from 'vue';

const CHAVE = 'tema-escuro';
const escuro = ref(false);

function aplicar(valor: boolean) {
  document.documentElement.classList.toggle('ion-palette-dark', valor);
}

export function iniciarTema() {
  const salvo = localStorage.getItem(CHAVE);
  escuro.value = salvo !== null ? salvo === '1' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  aplicar(escuro.value);
}

export function useTema() {
  function definirEscuro(valor: boolean) {
    escuro.value = valor;
    aplicar(valor);
    localStorage.setItem(CHAVE, valor ? '1' : '0');
  }
  return { escuro, definirEscuro };
}
