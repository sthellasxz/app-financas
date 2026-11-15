import { createApp } from 'vue';
import { IonicVue } from '@ionic/vue';
import VueApexCharts from 'vue3-apexcharts';
import App from './App.vue';
import router from './router';
import { iniciarAuth } from './composables/useAuth';
import { iniciarTema } from './composables/useTema';

import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import '@ionic/vue/css/palettes/dark.class.css';
import './theme/variables.css';

iniciarTema();

const app = createApp(App).use(IonicVue).use(router).use(VueApexCharts);

iniciarAuth().then(() => router.isReady()).then(() => app.mount('#app'));
