export default defineNuxtConfig({
    ssr: false,
    modules: ['@pinia/nuxt', 'nuxt-headlessui','@element-plus/nuxt'],
    devtools: { enabled: false },
    app: {
        head: {
            title: 'Economy Rental Car',
            htmlAttrs: {
                lang: 'en',
            },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no',
                },
                { name: 'description', content: '' },
                { name: 'format-detection', content: 'telephone=no' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/economy_white.png' },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=ABeeZee&display=swap',
                },
            ],
        },
        pageTransition: { name: 'page', mode: 'out-in' },
    },
    build: {
        transpile: ['vue3-form-wizard', 'element-plus', 'vue3-popper']
    },
    vite: {
        ssr: {
            noExternal: ['element-plus', 'vue3-popper']
        }
    },
    css: ['~/assets/css/app.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    plugins: ['vue-tel-input'],
    compatibilityDate: '2024-08-14',
    nitro: {
        
        esbuild: {
            options: {
              target: 'esnext',
            },
          },
    },


    router: {
        options: { linkExactActiveClass: 'active' },
    },
});
