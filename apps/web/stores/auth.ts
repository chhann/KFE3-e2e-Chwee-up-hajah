// auth.ts
import { create } from 'zustand';

interface AuthState {
  userId: string | null;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  isAuthenticated: false,
  error: null,

  login: async (email, password) => {
    set({ error: null });
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        set({ error: data.error || '로그인 실패' });
        return;
      }

      set({ userId: data.userId, isAuthenticated: true, error: null });
    } catch (error: any) {
      set({ error: error.message || '알 수 없는 오류' });
    }
  },

  logout: () => set({ userId: null, isAuthenticated: false, error: null }),
}));
