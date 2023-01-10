// import { splitVendorChunkPlugin } from 'vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  // app: {
  //   head: {
  //     title: '',
  //     meta: [
  //       { charset: 'utf-8' },
  //       { name: 'viewport', content: 'width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
  //       { name: 'description', content: '' },
  //       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //     ],
  //     link: [],
  //     style: [],
  //     script: [],
  //   },
  // },
  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/css/main.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  // vite: {
  //   build: {
  //     rollupOptions: {
  //       plugins: [splitVendorChunkPlugin()],
  //     }
  //   }
  // }
})
