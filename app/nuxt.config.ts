export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],
  css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { class: 'dark', lang: 'tr' },
      title: 'UICloud Anime Demo',
      meta: [{ name: 'description', content: 'Anime detay sayfası demo' }],
    },
  },
  typescript: {
    strict: true,
  },
})
