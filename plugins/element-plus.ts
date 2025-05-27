import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { defineNuxtPlugin } from '#app'
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus)

  // 🛠️ Proveer ID para SSR (evita errores de hydration)
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
  })

  // 🛠️ Proveer Z-Index para SSR (evita errores de overlays/dialogs)
  nuxtApp.vueApp.provide(ZINDEX_INJECTION_KEY, {
    current: 2000, // valor inicial recomendado
  })
})
