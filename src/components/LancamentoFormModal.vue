<template>
  <ion-modal :is-open="aberto" @did-dismiss="emit('fechar')">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start"><ion-button @click="emit('fechar')">Cancelar</ion-button></ion-buttons>
        <ion-title>{{ lancamento ? 'Editar' : 'Nova' }} {{ tipo }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form novalidate @submit.prevent="enviar">
        <ion-input v-model="form.descricao" label="Descrição" label-placement="stacked" fill="outline"
          :class="{ 'ion-invalid ion-touched': erros.descricao }" :error-text="erros.descricao" />

        <ion-input v-model="valorTexto" label="Valor (R$)" label-placement="stacked" fill="outline"
          inputmode="decimal" placeholder="0,00" class="campo"
          :class="{ 'ion-invalid ion-touched': erros.valor }" :error-text="erros.valor" />

        <ion-select v-model="form.categoria" label="Categoria" label-placement="stacked" fill="outline"
          interface="action-sheet" placeholder="Selecione" class="campo">
          <ion-select-option v-for="c in categorias" :key="c" :value="c">{{ c }}</ion-select-option>
        </ion-select>
        <p v-if="erros.categoria" class="erro-campo">{{ erros.categoria }}</p>

        <ion-input v-model="form.data" type="date" label="Data" label-placement="stacked" fill="outline" class="campo"
          :class="{ 'ion-invalid ion-touched': erros.data }" :error-text="erros.data" />

        <ion-button expand="block" type="submit" class="campo" :disabled="salvando">
          <ion-spinner v-if="salvando" /><span v-else>Salvar</span>
        </ion-button>
      </form>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
  IonInput, IonSelect, IonSelectOption, IonSpinner } from '@ionic/vue';
import type { Lancamento, LancamentoInput, TipoLancamento } from '@/types';
import { categoriasPorTipo } from '@/constants/categorias';
import { validarLancamento, type ErrosLancamento } from '@/utils/validacao';
import { hojeISO } from '@/utils/format';

const props = defineProps<{ aberto: boolean; tipo: TipoLancamento; lancamento: Lancamento | null; salvando: boolean }>();
const emit = defineEmits<{ (e: 'fechar'): void; (e: 'salvar', dados: LancamentoInput): void }>();

const categorias = computed(() => categoriasPorTipo(props.tipo));
const form = reactive<LancamentoInput>({ descricao: '', valor: null, categoria: '', data: hojeISO() });
const valorTexto = ref('');
const erros = ref<ErrosLancamento>({});

// Toda vez que abre: preenche (edição) ou limpa (novo)
watch(() => props.aberto, (aberto) => {
  if (!aberto) return;
  erros.value = {};
  const l = props.lancamento;
  form.descricao = l?.descricao ?? '';
  form.categoria = l?.categoria ?? '';
  form.data = l?.data ?? hojeISO();
  valorTexto.value = l ? String(l.valor).replace('.', ',') : '';
});

// Aceita "1.234,56" ou "1234.56"
function converterValor(texto: string): number | null {
  const t = String(texto ?? '').trim();
  if (!t) return null;
  return Number(t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : t);
}

function enviar() {
  form.valor = converterValor(valorTexto.value);
  erros.value = validarLancamento(form, categorias.value);
  if (Object.keys(erros.value).length === 0) emit('salvar', { ...form, descricao: form.descricao.trim() });
}
</script>

<style scoped>
.campo { margin-top: 16px; }
</style>
