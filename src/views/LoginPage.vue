<template>
  <ion-page>
    <ion-content class="ion-padding fundo">
      <div class="caixa">
        <h1>Minhas Finanças</h1>
        <p>Entre para controlar suas receitas e despesas.</p>
        <form novalidate @submit.prevent="entrarNoApp">
          <ion-input v-model="email" type="email" label="E-mail" label-placement="stacked" fill="outline"
            :class="{ 'ion-invalid ion-touched': erros.email }" :error-text="erros.email" />
          <ion-input v-model="senha" type="password" label="Senha" label-placement="stacked" fill="outline" class="campo"
            :class="{ 'ion-invalid ion-touched': erros.senha }" :error-text="erros.senha" />
          <ion-text v-if="erroGeral" color="danger"><p>{{ erroGeral }}</p></ion-text>
          <ion-button expand="block" type="submit" class="campo" :disabled="carregando">
            <ion-spinner v-if="carregando" /><span v-else>Entrar</span>
          </ion-button>
        </form>
        <ion-button fill="clear" expand="block" router-link="/cadastro">Não tem conta? Cadastre-se</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonInput, IonButton, IonText, IonSpinner } from '@ionic/vue';
import { useAuth } from '@/composables/useAuth';
import { validarEmail, validarSenha } from '@/utils/validacao';

const router = useRouter();
const { entrar } = useAuth();
const email = ref('');
const senha = ref('');
const erros = ref<{ email?: string; senha?: string }>({});
const erroGeral = ref('');
const carregando = ref(false);

async function entrarNoApp() {
  erroGeral.value = '';
  erros.value = { email: validarEmail(email.value) ?? undefined, senha: validarSenha(senha.value) ?? undefined };
  if (erros.value.email || erros.value.senha) return;
  carregando.value = true;
  try {
    await entrar(email.value, senha.value);
    router.replace('/tabs/dashboard');
  } catch (e) {
    erroGeral.value = (e as Error).message;
  } finally {
    carregando.value = false;
  }
}
</script>

<style scoped>
.caixa { max-width: 420px; margin: 15vh auto 0; }
h1 { color: var(--ion-color-primary); font-weight: 700; }
.campo { margin-top: 16px; }
</style>
