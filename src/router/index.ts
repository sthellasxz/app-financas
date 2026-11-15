import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { iniciarAuth, useAuth } from '@/composables/useAuth';
import TabsPage from '@/views/TabsPage.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/tabs/dashboard' },
  { path: '/login', component: () => import('@/views/LoginPage.vue'), meta: { publica: true } },
  { path: '/cadastro', component: () => import('@/views/CadastroPage.vue'), meta: { publica: true } },
  {
    path: '/tabs/',
    component: TabsPage,
    meta: { requerLogin: true },
    children: [
      { path: '', redirect: '/tabs/dashboard' },
      { path: 'dashboard', component: () => import('@/views/DashboardPage.vue') },
      { path: 'receitas', component: () => import('@/views/ReceitasPage.vue') },
      { path: 'despesas', component: () => import('@/views/DespesasPage.vue') },
      { path: 'perfil', component: () => import('@/views/PerfilPage.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/tabs/dashboard' },
];

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes });

// Protege as telas internas: sem login, vai para /login
router.beforeEach(async (to) => {
  await iniciarAuth();
  const { usuario } = useAuth();
  const logado = usuario.value !== null;
  if (to.matched.some((r) => r.meta.requerLogin) && !logado) return '/login';
  if (to.meta.publica && logado) return '/tabs/dashboard';
  return true;
});

export default router;
