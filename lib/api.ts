import axios from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

if (typeof window !== 'undefined') {
  api.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('atlas_token');
    if (token) {
      config.headers = config.headers || {};
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export type LoginResponse = { token: string; role: 'student' | 'teacher' | 'admin' };

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
  return data;
}

export function saveToken(token: string) {
  if (typeof window !== 'undefined') window.localStorage.setItem('atlas_token', token);
}
export function clearToken() {
  if (typeof window !== 'undefined') window.localStorage.removeItem('atlas_token');
}
