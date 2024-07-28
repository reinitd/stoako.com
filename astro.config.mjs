import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://stoako.com',
    integrations: [sitemap()],
    redirects: {
        '/api/v1': '/api',
        '/members/member': '/'
    }
});