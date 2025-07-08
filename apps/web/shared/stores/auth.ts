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
        console.log('Auth Store: Attempting login...'); // <-- 추가
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();
          console.log('Auth Store: Login API response data:', data); // <-- 추가

          if (!res.ok) {
            console.log('Auth Store: Login failed, API not ok. Error:', data.error); // <-- 추가
            set({ error: data.error || '로그인 실패' });
            return;
          }

          console.log('Auth Store: Setting state with userId:', data.userId); // <-- 추가
          set({
            userId: data.userId,
            isAuthenticated: true,
            error: null,
          });
          console.log('Auth Store: State after login:', get()); // <-- 추가
        } catch (err: any) {
          console.error('Auth Store: Network or unexpected error during login:', err); // <-- 추가
          set({ error: err?.message || '네트워크 오류' });
        }
      },

      logout: () => {
        console.log('Auth Store: Logging out...'); // <-- 추가
        set({
          userId: null,
          isAuthenticated: false,
          error: null,
        });
        console.log('Auth Store: State after logout:', get()); // <-- 추가
        // (선택) 서버 로그아웃 API 호출 필요 시 이곳에서 처리
      },

      restore: async () => {
        console.log('Auth Store: Restoring session...'); // <-- 추가
        try {
          const res = await fetch('/api/auth/session'); // 예: Supabase 세션 API 또는 쿠키 기반
          const data = await res.json();
          console.log('Auth Store: Session restore API response data:', data); // <-- 추가

          if (res.ok && data.userId) {
            console.log('Auth Store: Setting state with restored userId:', data.userId); // <-- 추가
            set({
              userId: data.userId,
              isAuthenticated: true,
              error: null,
            });
          } else {
            console.log('Auth Store: Session restore failed or no userId. Resetting state.'); // <-- 추가
            set({
              userId: null,
              isAuthenticated: false,
              error: null,
            });
          }
          console.log('Auth Store: State after restore:', get()); // <-- 추가
        } catch (err) {
          console.error('Auth Store: Error during session restore:', err); // <-- 추가
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
        console.log('Auth Store: Rehydration complete. Current state:', store.getState()); // <-- 추가
      },
    }
  )
);
