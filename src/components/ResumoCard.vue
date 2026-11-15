<template>
  <ion-card class="card">
    <ion-card-content>
      <div class="cab"><ion-icon :icon="icone" :style="{ color: cor }" /> {{ titulo }}</div>
      <div class="valor" :style="{ color: cor }">{{ valor }}</div>
      <div v-if="detalhe" class="detalhe">{{ detalhe }}</div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonIcon } from '@ionic/vue';
defineProps<{ titulo: string; valor: string; icone: string; cor?: string; detalhe?: string }>();
</script>

<style scoped>
.card { margin: 0; height: 100%; --background: var(--app-card-bg); }
.cab { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--ion-color-medium); }
.valor { font-size: 1.3rem; font-weight: 700; margin-top: 6px; color: var(--ion-text-color); }
.detalhe { font-size: 0.75rem; color: var(--ion-color-medium); }
</style>
