<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="dashboard" href="/tabs/dashboard">
          <ion-icon :icon="pieChartOutline" /><ion-label>Dashboard</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="receitas" href="/tabs/receitas">
          <ion-icon :icon="trendingUpOutline" /><ion-label>Receitas</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="despesas" href="/tabs/despesas">
          <ion-icon :icon="trendingDownOutline" /><ion-label>Despesas</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="perfil" href="/tabs/perfil">
          <ion-icon :icon="personCircleOutline" /><ion-label>Perfil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
import { pieChartOutline, trendingUpOutline, trendingDownOutline, personCircleOutline } from 'ionicons/icons';
</script>
