<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary"><ion-title>{{ titulo }}</ion-title></ion-toolbar>
    </ion-header>
    <ion-content class="fundo">
      <div class="conteudo-central">
        <periodo-filtro />

        <div class="total">
          <span>Total no período</span>
          <strong :class="tipo === 'receita' ? 'texto-receita' : 'texto-despesa'">{{ formatarMoeda(total) }}</strong>
        </div>

        <div v-if="carregando" class="ion-text-center ion-padding"><ion-spinner /></div>
        <ion-text v-else-if="erro" color="danger"><p class="ion-padding">{{ erro }}</p></ion-text>
        <p v-else-if="visiveis.length === 0" class="vazio">Nenhuma {{ tipo }} encontrada. Toque no + para adicionar.</p>

        <ion-list v-else inset>
          <ion-item-sliding v-for="item in visiveis" :key="item.id">
            <ion-item button :detail="false" @click="abrirEdicao(item)">
              <ion-label>
                <h2>{{ item.descricao }}</h2>
                <p>{{ item.categoria }} · {{ formatarData(item.data) }}</p>
              </ion-label>
              <ion-note slot="end" :class="tipo === 'receita' ? 'texto-receita' : 'texto-despesa'">
                {{ formatarMoeda(item.valor) }}
              </ion-note>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option color="medium" @click="abrirEdicao(item)"><ion-icon slot="icon-only" :icon="createOutline" /></ion-item-option>
              <ion-item-option color="danger" @click="confirmarExclusao(item)"><ion-icon slot="icon-only" :icon="trashOutline" /></ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
      </div>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="abrirNovo"><ion-icon :icon="add" /></ion-fab-button>
      </ion-fab>

      <lancamento-form-modal :aberto="modalAberto" :tipo="tipo" :lancamento="emEdicao" :salvando="salvando"
        @fechar="modalAberto = false" @salvar="salvar" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonItemSliding,
  IonItemOptions, IonItemOption, IonLabel, IonNote, IonIcon, IonFab, IonFabButton, IonSpinner, IonText,
  alertController, toastController, onIonViewWillEnter } from '@ionic/vue';
import { add, createOutline, trashOutline } from 'ionicons/icons';
import type { Lancamento, LancamentoInput, TipoLancamento } from '@/types';
import { useLancamentos } from '@/composables/useLancamentos';
import { usePeriodo } from '@/composables/usePeriodo';
import { filtrarPorPeriodo, somar } from '@/utils/dashboard';
import { formatarData, formatarMoeda } from '@/utils/format';
import PeriodoFiltro from './PeriodoFiltro.vue';
import LancamentoFormModal from './LancamentoFormModal.vue';

const props = defineProps<{ tipo: TipoLancamento; titulo: string }>();
const { itens, carregando, erro, listar, salvar: salvarNoBanco, excluir } = useLancamentos(props.tipo);
const { periodo } = usePeriodo();

const modalAberto = ref(false);
const emEdicao = ref<Lancamento | null>(null);
const salvando = ref(false);

const visiveis = computed(() => filtrarPorPeriodo(itens.value, periodo.value));
const total = computed(() => somar(visiveis.value));

onIonViewWillEnter(listar);

function abrirNovo() { emEdicao.value = null; modalAberto.value = true; }
function abrirEdicao(item: Lancamento) { emEdicao.value = item; modalAberto.value = true; }

async function avisar(message: string, color = 'success') {
  const t = await toastController.create({ message, color, duration: 2000, position: 'top' });
  await t.present();
}

async function salvar(dados: LancamentoInput) {
  salvando.value = true;
  try {
    await salvarNoBanco(dados, emEdicao.value?.id);
    modalAberto.value = false;
    await avisar('Salvo com sucesso!');
  } catch (e) {
    await avisar('Erro: ' + (e as Error).message, 'danger');
  } finally {
    salvando.value = false;
  }
}

async function confirmarExclusao(item: Lancamento) {
  const alerta = await alertController.create({
    header: 'Excluir?',
    message: `"${item.descricao}" será removido.`,
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      { text: 'Excluir', role: 'destructive', handler: async () => {
        try { await excluir(item.id); await avisar('Excluído.'); }
        catch (e) { await avisar('Erro: ' + (e as Error).message, 'danger'); }
      } },
    ],
  });
  await alerta.present();
}
</script>

<style scoped>
.total { display: flex; justify-content: space-between; padding: 12px 20px 0; }
.total strong { font-size: 1.3rem; }
.vazio { text-align: center; padding: 40px 16px; color: var(--ion-color-medium); }
</style>
