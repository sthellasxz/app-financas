<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary"><ion-title>Perfil</ion-title></ion-toolbar>
    </ion-header>
    <ion-content class="fundo">
      <div class="conteudo-central">
        <ion-list inset>
          <ion-item>
            <ion-label><h2>{{ nome }}</h2><p>{{ usuario?.email }}</p></ion-label>
          </ion-item>
          <ion-item>
            <ion-toggle :checked="escuro" @ion-change="definirEscuro($event.detail.checked)">Modo escuro</ion-toggle>
          </ion-item>
        </ion-list>
        <div class="ion-padding">
          <ion-button expand="block" color="danger" @click="sairDoApp">Sair</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonToggle, IonButton } from '@ionic/vue';
import { useAuth } from '@/composables/useAuth';
import { useTema } from '@/composables/useTema';

const router = useRouter();
const { usuario, nome, sair } = useAuth();
const { escuro, definirEscuro } = useTema();

async function sairDoApp() {
  await sair();
  router.replace('/login');
}
</script>
