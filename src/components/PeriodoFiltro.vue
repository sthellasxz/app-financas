<template>
  <div class="periodo">
    <ion-segment v-model="preset" scrollable>
      <ion-segment-button value="tudo"><ion-label>Tudo</ion-label></ion-segment-button>
      <ion-segment-button value="mes"><ion-label>Este mês</ion-label></ion-segment-button>
      <ion-segment-button value="3meses"><ion-label>3 meses</ion-label></ion-segment-button>
      <ion-segment-button value="ano"><ion-label>Ano</ion-label></ion-segment-button>
      <ion-segment-button value="personalizado"><ion-label>Datas</ion-label></ion-segment-button>
    </ion-segment>
    <div v-if="preset === 'personalizado'" class="datas">
      <ion-input v-model="inicioPersonalizado" type="date" label="De" label-placement="stacked" fill="outline" />
      <ion-input v-model="fimPersonalizado" type="date" label="Até" label-placement="stacked" fill="outline" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonSegment, IonSegmentButton, IonLabel, IonInput } from '@ionic/vue';
import { usePeriodo } from '@/composables/usePeriodo';
const { preset, inicioPersonalizado, fimPersonalizado } = usePeriodo();
</script>

<style scoped>
.periodo { padding: 8px 12px 0; }
.datas { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
</style>
