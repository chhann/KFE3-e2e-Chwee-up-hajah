'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  userId: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  restore: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userId: null,
      isAuthenticated: false,
      isHydrated: false,
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

          set({
            userId: data.userId,
            isAuthenticated: true,
            error: null,
          });
        } catch (err: any) {
          set({ error: err?.message || '네트워크 오류' });
        }
      },

      logout: () => {
        set({
          userId: null,
          isAuthenticated: false,
          error: null,
        });
        // (선택) 서버 로그아웃 API 호출 필요 시 이곳에서 처리
      },

      restore: async () => {
        try {
          const res = await fetch('/api/auth/session'); // 예: Supabase 세션 API 또는 쿠키 기반
          const data = await res.json();

          if (res.ok && data.userId) {
            set({
              userId: data.userId,
              isAuthenticated: true,
              error: null,
            });
          } else {
            set({
              userId: null,
              isAuthenticated: false,
              error: null,
            });
          }
        } catch (err) {
          set({
            userId: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        userId: state.userId,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (_, store) => {
        (store as any).setState({ isHydrated: true });
      },
    }
  )
);
