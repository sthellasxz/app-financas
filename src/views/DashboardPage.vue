<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary"><ion-title>Dashboard</ion-title></ion-toolbar>
    </ion-header>
    <ion-content class="fundo">
      <div class="conteudo-central">
        <periodo-filtro />

        <div class="cards">
          <resumo-card titulo="Receitas" :valor="formatarMoeda(totalReceitas)" :icone="trendingUpOutline" cor="var(--app-receita)" />
          <resumo-card titulo="Despesas" :valor="formatarMoeda(totalDespesas)" :icone="trendingDownOutline" cor="var(--app-despesa)" />
          <resumo-card class="saldo" titulo="Saldo atual" :valor="formatarMoeda(saldo)" :icone="walletOutline"
            :cor="saldo >= 0 ? 'var(--app-receita)' : 'var(--app-despesa)'" />
        </div>

        <ion-card>
          <ion-card-header><ion-card-title>Indicadores</ion-card-title></ion-card-header>
          <ion-list lines="full">
            <ion-item>
              <ion-label>Maior categoria de gasto</ion-label>
              <ion-note slot="end">{{ maiorCategoria ? `${maiorCategoria.categoria} (${formatarMoeda(maiorCategoria.total)})` : '—' }}</ion-note>
            </ion-item>
            <ion-item>
              <ion-label>Quantidade de lançamentos</ion-label>
              <ion-note slot="end">{{ quantidade }}</ion-note>
            </ion-item>
            <ion-item>
              <ion-label>Despesas / receitas</ion-label>
              <ion-note slot="end">{{ percentual === null ? '—' : percentual.toFixed(1) + '%' }}</ion-note>
            </ion-item>
          </ion-list>
          <ion-card-content v-if="percentual !== null">
            <ion-progress-bar :value="Math.min(percentual / 100, 1)" :color="percentual > 100 ? 'danger' : percentual > 80 ? 'warning' : 'success'" />
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header><ion-card-title>Despesas por categoria</ion-card-title></ion-card-header>
          <ion-card-content><grafico-pizza :dados="porCategoria" /></ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header><ion-card-title>Receitas x Despesas por mês</ion-card-title></ion-card-header>
          <ion-card-content><grafico-barras :dados="porMes" /></ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonList, IonItem, IonLabel, IonNote, IonProgressBar, onIonViewWillEnter } from '@ionic/vue';
import { trendingUpOutline, trendingDownOutline, walletOutline } from 'ionicons/icons';
import { useLancamentos } from '@/composables/useLancamentos';
import { usePeriodo } from '@/composables/usePeriodo';
import { filtrarPorPeriodo, somar, somarPorCategoria, totaisPorMes, percentualDespesas } from '@/utils/dashboard';
import { formatarMoeda } from '@/utils/format';
import ResumoCard from '@/components/ResumoCard.vue';
import PeriodoFiltro from '@/components/PeriodoFiltro.vue';
import GraficoPizza from '@/components/GraficoPizza.vue';
import GraficoBarras from '@/components/GraficoBarras.vue';

const rec = useLancamentos('receita');
const desp = useLancamentos('despesa');
const { periodo } = usePeriodo();

onIonViewWillEnter(() => Promise.all([rec.listar(), desp.listar()]));

const receitas = computed(() => filtrarPorPeriodo(rec.itens.value, periodo.value));
const despesas = computed(() => filtrarPorPeriodo(desp.itens.value, periodo.value));

const totalReceitas = computed(() => somar(receitas.value));
const totalDespesas = computed(() => somar(despesas.value));
const saldo = computed(() => totalReceitas.value - totalDespesas.value);
const porCategoria = computed(() => somarPorCategoria(despesas.value));
const maiorCategoria = computed(() => porCategoria.value[0] ?? null);
const quantidade = computed(() => receitas.value.length + despesas.value.length);
const percentual = computed(() => percentualDespesas(totalReceitas.value, totalDespesas.value));
const porMes = computed(() => totaisPorMes(receitas.value, despesas.value));
</script>

<style scoped>
.cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 12px; }
.saldo { grid-column: span 2; }
</style>
