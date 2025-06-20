'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore(state => state.initialize)

  useEffect(() => {
    // 애플리케이션 시작 시 인증 상태 초기화
    initialize()
  }, [initialize])

  return <>{children}</>
}