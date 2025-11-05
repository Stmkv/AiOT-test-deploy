const BASE_URL = '/api/auth-service';

export const introspect = async (token: string) => {
  const res = await fetch(`${BASE_URL}/auth/introspect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token: token }),
  });
  if (!res.ok) throw new Error('Introspect failed');
  return res.json();
};

export const refresh = async (refreshToken: string) => {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!res.ok) throw new Error('Refresh failed');
  return res.json();
};
