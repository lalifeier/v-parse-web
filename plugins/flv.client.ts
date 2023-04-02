import flv from 'flv.js'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      flv,
    },
  }
})
