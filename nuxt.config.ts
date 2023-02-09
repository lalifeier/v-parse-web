// import { splitVendorChunkPlugin } from 'vite'
import externalGlobals from "rollup-plugin-external-globals";

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
  app: {
    head: {
      // title: '',
      // meta: [
      //   { charset: 'utf-8' },
      //   { name: 'viewport', content: 'width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      //   { name: 'description', content: '' },
      //   { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // ],
      link: [
        {
          rel: 'preconnect',
          href: "https://cdn.jsdelivr.net",
        },
        {
          rel: 'dns-prefetch',
          href: "https://cdn.jsdelivr.net",
        },
      ],
      style: [],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/artplayer@4.6.2/dist/artplayer.min.js"
        },
        {
          src: "https://cdn.jsdelivr.net/npm/flv.js@1.6.2/dist/flv.min.js"
        },
        {
          src: "https://cdn.jsdelivr.net/npm/hls.js@1.3.2/dist/hls.min.js"
        },
      ],
    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/css/main.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  plugins: [
    // { src: '@/plugins/flv.client.ts', ssr: false },
  ],
  vite: {
    ssr: {
      // noExternal: ["flv.js"],
    },
    build: {
      rollupOptions: {
        external: [
          'artplayer',
          'hls',
          'flv'
        ],
        plugins: [
          externalGlobals({
            artplayer: 'Artplayer',
            'hls.js': 'Hls',
            'flv.js': 'flvjs'
          })
        ]
      }
    }
  }
})
