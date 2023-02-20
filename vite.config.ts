/// <reference types="vitest" />
/// <reference types="vitest/globals"/>
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, './src') },
        { find: 'pages', replacement: resolve(__dirname, './src/pages') },
        {
          find: 'components',
          replacement: resolve(__dirname, './src/components'),
        },
      ],
    },
    define: { 'process.env': { ...loadEnv(mode, process.cwd()) } },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./setupTests.ts'],
    },
  });
};
