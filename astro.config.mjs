import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://oriel.is-a.dev',
    output: 'static',
    integrations: [sitemap()],
    vite: {
        plugins: [tailwindcss()],
        server: {
            allowedHosts: true
        }
    },
    i18n: {
        locales: ['es', 'en'],
        defaultLocale: 'es',
        routing: {
            prefixDefaultLocale: false,
        },
    },
});
