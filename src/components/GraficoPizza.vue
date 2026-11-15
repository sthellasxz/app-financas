<template>
  <apexchart v-if="series.length" type="pie" height="320" :options="opcoes" :series="series" />
  <p v-else class="sem-dados">Sem despesas no período.</p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTema } from '@/composables/useTema';
import { formatarMoeda } from '@/utils/format';

const props = defineProps<{ dados: { categoria: string; total: number }[] }>();
const { escuro } = useTema();

const series = computed(() => props.dados.map((d) => d.total));
const opcoes = computed(() => ({
  chart: { background: 'transparent' },
  theme: { mode: escuro.value ? 'dark' : 'light' },
  labels: props.dados.map((d) => d.categoria),
  colors: ['#d64545', '#f08c2e', '#e5b818', '#2e9e8f', '#3b7dd8', '#8a5cd1', '#8c8c8c'],
  legend: { position: 'bottom' },
  tooltip: { y: { formatter: (v: number) => formatarMoeda(v) } },
}));
</script>

<style scoped>
.sem-dados { text-align: center; color: var(--ion-color-medium); padding: 24px 0; }
</style>
