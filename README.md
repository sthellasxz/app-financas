# Minhas Finanças

Aplicativo mobile de controle financeiro pessoal: cadastro de receitas e despesas,
autenticação de usuários e dashboard com indicadores e gráficos.

## Tecnologias
- Ionic 8 + Vue 3 (Composition API, TypeScript)
- Supabase (Auth + PostgreSQL com Row Level Security)
- Vue ApexCharts

## Funcionalidades
- Login, cadastro e logout (Supabase Auth)
- CRUD de receitas e despesas com validação dos formulários
- Dashboard: total de receitas, total de despesas, saldo, gráfico de pizza
  (despesas por categoria), gráfico de barras (receitas x despesas por mês) e indicadores
  (maior categoria de gasto, quantidade de lançamentos, % despesas/receitas)
- Extras: modo escuro e filtro por período

## Como rodar
1. `npm install`
2. Copie `.env.example` para `.env` e preencha com a URL e a Publishable key do Supabase
3. Rode `supabase/schema.sql` no SQL Editor do Supabase
4. `npm run dev` (ou `ionic serve`)

## Estrutura
```
src/
  lib/          cliente do Supabase
  types/        tipos TypeScript
  constants/    categorias
  utils/        formatação, validação e cálculos do dashboard
  composables/  autenticação, CRUD, filtro por período e tema
  components/   cards, formulário, lista e gráficos reutilizáveis
  views/        telas (login, cadastro, dashboard, receitas, despesas, perfil)
  router/       rotas e proteção de login
```

## Integrantes
- Nome 1
- Nome 2
