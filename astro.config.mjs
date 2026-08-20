import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://oriel-r.github.io',
    base: '/webfolio',
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
