import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { seoHead } from './src/lib/seo.mjs';
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss(), {name:'fanisi-seo',transformIndexHtml:(html,ctx)=>html.replace('<!--fanisi-seo-->',`<!--fanisi-seo-start-->${seoHead(command === 'build',ctx.path)}<!--fanisi-seo-end-->`)}],
  server: {headers: {'X-Robots-Tag':'noindex, nofollow'}},
  preview: {headers: {'X-Robots-Tag':'noindex, nofollow'}},
}));
