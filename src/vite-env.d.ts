/// <reference types="vite/client" />

declare module 'vue3-apexcharts';

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}
