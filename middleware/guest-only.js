export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return;

  const userData = localStorage.getItem('auth');
  if (!userData) return;

  const user = JSON.parse(userData);
  const role = user.user.role;

  if (role === 'admin') return navigateTo('/admin');
  if (role === 'manager') return navigateTo('/manager');
  if (role === 'staff') return navigateTo('/staff');
  return navigateTo('/unauthorized');
});