export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;
  const userData = localStorage.getItem('auth');
  if (!userData) return navigateTo('/login');

  const user = JSON.parse(userData);
  const role = user.user.role;
  
  if (role === 'admin' && !to.path.startsWith('/admin')) {
    return navigateTo('/admin');
  }

  if (role === 'manager' && !to.path.startsWith('/manager')) {
    return navigateTo('/manager');
  }

  if (role === 'staff' && !to.path.startsWith('/staff')) {
    return navigateTo('/staff');
  }

  if (!['admin', 'manager', 'staff'].includes(role)) {
    return navigateTo('/unauthorized');
  }
});
