export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const Popper = (await import('vue3-popper')).default
    nuxtApp.vueApp.component('Popper', Popper)
  }
})
