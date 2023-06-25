import { AppRoutes } from '@/routes/AppRouter';

export const logout = () => {
  localStorage.setItem('auth-token', '');
  localStorage.setItem('acc-id', '');
  localStorage.setItem('user-email', '');
  localStorage.setItem('refresh-token', '');

  window.location.href = `${AppRoutes.HOME}#login`;
};
