<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-back-button default-href="/login" /></ion-buttons>
        <ion-title>Criar conta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding fundo">
      <form class="caixa" novalidate @submit.prevent="cadastrarUsuario">
        <ion-input v-model="nome" label="Nome" label-placement="stacked" fill="outline"
          :class="{ 'ion-invalid ion-touched': erros.nome }" :error-text="erros.nome" />
        <ion-input v-model="email" type="email" label="E-mail" label-placement="stacked" fill="outline" class="campo"
          :class="{ 'ion-invalid ion-touched': erros.email }" :error-text="erros.email" />
        <ion-input v-model="senha" type="password" label="Senha" label-placement="stacked" fill="outline" class="campo"
          :class="{ 'ion-invalid ion-touched': erros.senha }" :error-text="erros.senha" />
        <ion-input v-model="confirmar" type="password" label="Confirmar senha" label-placement="stacked" fill="outline" class="campo"
          :class="{ 'ion-invalid ion-touched': erros.confirmar }" :error-text="erros.confirmar" />
        <ion-text v-if="mensagem" :color="sucesso ? 'success' : 'danger'"><p>{{ mensagem }}</p></ion-text>
        <ion-button expand="block" type="submit" class="campo" :disabled="carregando">
          <ion-spinner v-if="carregando" /><span v-else>Cadastrar</span>
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
  IonInput, IonButton, IonText, IonSpinner } from '@ionic/vue';
import { useAuth } from '@/composables/useAuth';
import { validarEmail, validarSenha } from '@/utils/validacao';

const router = useRouter();
const { cadastrar } = useAuth();
const nome = ref(''); const email = ref(''); const senha = ref(''); const confirmar = ref('');
const erros = ref<Record<string, string | undefined>>({});
const mensagem = ref(''); const sucesso = ref(false); const carregando = ref(false);

async function cadastrarUsuario() {
  mensagem.value = '';
  erros.value = {
    nome: nome.value.trim().length < 2 ? 'Informe seu nome.' : undefined,
    email: validarEmail(email.value) ?? undefined,
    senha: validarSenha(senha.value) ?? undefined,
    confirmar: confirmar.value !== senha.value ? 'As senhas não conferem.' : undefined,
  };
  if (Object.values(erros.value).some(Boolean)) return;

  carregando.value = true;
  try {
    const jaLogado = await cadastrar(nome.value, email.value, senha.value);
    if (jaLogado) router.replace('/tabs/dashboard');
    else { sucesso.value = true; mensagem.value = 'Conta criada! Confirme pelo e-mail e depois faça login.'; }
  } catch (e) {
    sucesso.value = false;
    mensagem.value = (e as Error).message;
  } finally {
    carregando.value = false;
  }
}
</script>

<style scoped>
.caixa { max-width: 420px; margin: 0 auto; }
.campo { margin-top: 16px; }
</style>
