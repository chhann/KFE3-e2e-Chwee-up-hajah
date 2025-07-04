'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  userId: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  error: string | null;

  setSession: (userId: string | null) => void;
  logout: () => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      isAuthenticated: false,
      isHydrated: false,
      error: null,

      setSession: (userId) => {
        set({
          userId,
          isAuthenticated: !!userId,
          error: null,
        });
      },

      logout: () => {
        set({
          userId: null,
          isAuthenticated: false,
          error: null,
        });
        // 참고: 실제 서버 로그아웃은 useLogoutMutation과 같은 TanStack Query 훅으로 처리해야 합니다.
      },

      setError: (error) => set({ error }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        userId: state.userId,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.isHydrated = true;
      },
    }
  )
);
