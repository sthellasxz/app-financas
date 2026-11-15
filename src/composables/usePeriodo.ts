import { ref, computed } from 'vue';
import type { Periodo } from '@/types';
import { hojeISO } from '@/utils/format';

const preset = ref<'tudo' | 'mes' | '3meses' | 'ano' | 'personalizado'>('tudo');
const inicioPersonalizado = ref('');
const fimPersonalizado = ref('');

function primeiroDia(mesesAtras: number): string {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - mesesAtras);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
}

export function usePeriodo() {
  const periodo = computed<Periodo>(() => {
    switch (preset.value) {
      case 'mes': return { inicio: primeiroDia(0), fim: hojeISO() };
      case '3meses': return { inicio: primeiroDia(2), fim: hojeISO() };
      case 'ano': return { inicio: `${new Date().getFullYear()}-01-01`, fim: hojeISO() };
      case 'personalizado': return { inicio: inicioPersonalizado.value || null, fim: fimPersonalizado.value || null };
      default: return { inicio: null, fim: null };
    }
  });
  return { preset, inicioPersonalizado, fimPersonalizado, periodo };
}
