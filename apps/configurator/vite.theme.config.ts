import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  plugins: [react()],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: 'shopify/theme/assets', emptyOutDir: false, minify: true,
    lib: { entry: fileURLToPath(new URL('./src/main.tsx', import.meta.url)), name: 'CasenConfigurator', formats: ['iife'], fileName: () => 'casen-configurator.js', cssFileName: 'casen-configurator' },
  },
});
