export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;
  const userData = localStorage.getItem('auth');
  if (!userData) return navigateTo('/login');

  const user = JSON.parse(userData);
  const role = user.user.role;
  
  if (role === 'admin' && !to.path.startsWith('/admin')) {
    return navigateTo('/admin');
  }

  if (role === 'customer' && !to.path.startsWith('/customer')) {
    return navigateTo('/customer');
  }

  if (role === 'staff' && !to.path.startsWith('/staff')) {
    return navigateTo('/staff');
  }

  if (!['admin', 'customer', 'staff'].includes(role)) {
    return navigateTo('/unauthorized');
  }
});
