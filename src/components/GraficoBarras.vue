<template>
  <apexchart v-if="dados.length" type="bar" height="320" :options="opcoes" :series="series" />
  <p v-else class="sem-dados">Sem lançamentos no período.</p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTema } from '@/composables/useTema';
import { formatarMoeda, rotuloMes } from '@/utils/format';

const props = defineProps<{ dados: { mes: string; receitas: number; despesas: number }[] }>();
const { escuro } = useTema();

const series = computed(() => [
  { name: 'Receitas', data: props.dados.map((d) => d.receitas) },
  { name: 'Despesas', data: props.dados.map((d) => d.despesas) },
]);
const opcoes = computed(() => ({
  chart: { background: 'transparent', toolbar: { show: false } },
  theme: { mode: escuro.value ? 'dark' : 'light' },
  colors: ['#1f9d55', '#d64545'],
  plotOptions: { bar: { columnWidth: '60%', borderRadius: 4 } },
  dataLabels: { enabled: false },
  xaxis: { categories: props.dados.map((d) => rotuloMes(d.mes)) },
  tooltip: { y: { formatter: (v: number) => formatarMoeda(v) } },
  legend: { position: 'top' },
}));
</script>

<style scoped>
.sem-dados { text-align: center; color: var(--ion-color-medium); padding: 24px 0; }
</style>
