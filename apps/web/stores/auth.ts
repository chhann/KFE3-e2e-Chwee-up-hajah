import { create } from 'zustand'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  initialized: boolean
  error: string | null
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setLoading: (loading: boolean) => void
  initialize: () => Promise<void>
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  initialized: false,
  error: null,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // 클라이언ㅌ 사이드 초기화
  initialize: async () => {
    if (get().initialized) return

    try {
      const supabase = createClient()
    
    // 현재 세션 확인(쿠키에서)
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if(error) {
        console.error('Session initialization error:', error)
        set({ error: error.message })
    }

    set({
      session,
      user: session?.user ?? null,
      loading: false,
      initialized: true,
      error: null
    })

    // 실시간 인증 상태 변경 리스너
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event)
      
      set({
        session,
        user: session?.user ?? null,
        loading: false,
        error: null
      })

      
      // 로그인 성공 시 미들웨어가 쿠키를 업데이트하도록 페이지 새로고침 트리거
      if (event === 'SIGNED_IN') {
        // 이렇게 하면 미들웨어가 새로운 세션을 감지하고 쿠기 동기화
         window.location.href = '/dashboard'
      }

      // 로그아웃 시 로그인 페이지로 이동
      if (event === 'SIGNED_OUT') {
          window.location.href = '/login'
      }
    }) } catch (error) {
      console.error('Auth initialization failed:', error)
      set({ 
        loading: false, 
        initialized: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  },

  refreshSession: async () => {
    try {
      const supabase = createClient()
      const { data: { session }, error } = await supabase.auth.refreshSession()
      
      if (error) throw error
      
      set({
        session,
        user: session?.user ?? null,
        error: null
      })
    } catch (error) {
      console.error('Session refresh failed:', error)
      set({ error: error instanceof Error ? error.message : 'Refresh failed' })
    }
  },

  signOut: async () => {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      
      if (error) throw error
      
      set({ user: null, session: null, error: null })
      window.location.href = '/login'
    } catch (error) {
      console.error('Sign out failed:', error)
      set({ error: error instanceof Error ? error.message : 'Sign out failed' })
    }
  }
}))
