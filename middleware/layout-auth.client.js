export default defineNuxtRouteMiddleware((to, from) => {
  const rawUser = localStorage.getItem('auth')
  const user = JSON.parse(rawUser || '{}')
  const isAuthenticated = !!user.token
  if (isAuthenticated && to.meta.layout !== 'logged-layout') {
    to.meta.layout = 'logged-layout'
  }
})
