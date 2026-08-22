import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://oriel.is-a.dev',
    output: 'static',
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
