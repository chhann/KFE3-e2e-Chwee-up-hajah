// server
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Service Key 아님!
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // HttpOnly, Secure 쿠기 설정
              cookieStore.set(name, value, {
                ...options,
                // Supabase가 제공하는 기본 옵션 사용
                // httpOnly는 Supabase에서 자동 설정
                secure: process.env.NODE_ENV === 'production', // HTTPS. 전용
                sameSite: 'lax' // CSRF 방지
              })
            })
          } catch (error) {
            // Server Component에서는 쿠키 설정이 제한될 수 있음
            console.warn('Failed to set cookie in server component:', error)
          }
        },
      },
    }
  )
}