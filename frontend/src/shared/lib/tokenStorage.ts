export const tokenStorage = {
  getAccess: () => localStorage.getItem('access_token'),
  getRefresh: () => localStorage.getItem('refresh_token'),
  save: (access: string, refresh: string) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    window.dispatchEvent(new CustomEvent('authChange', { detail: { type: 'login' } }));
  },
  clear: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.dispatchEvent(new CustomEvent('authChange', { detail: { type: 'logout' } }));
  },
};
