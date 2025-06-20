// middeware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  
  // 응답 객체 생성
  let supabaseResponse = NextResponse.next({
    request,
  })

  // 서버용 Supabase 클라이언트 생성
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // 요청에서 모든 쿠키 읽기
        getAll() {
          return request.cookies.getAll()
        },
        // 응답에 쿠키 설정
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // 요청 객체에도 쿠키 생성 (다음 미들웨어를 위해)
            request.cookies.set(name, value)
            // 응답 객체에도 생성 (브라우저로 전송하기 위해)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  
  try {
    // 세션 확인 및 쿠키 동기화
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.warn('Middleware auth error:', error)

      // 세션 에러 시 auth 쿠키 삭제
      supabaseResponse.cookies.delete('sb-access-token')
      supabaseResponse.cookies.delete('sb-refresh-token')

      // 인증 오류 시 로그인 페이지로 리다이렉트할 수도 있음
      // return NextResponse.redirect(new URL('/login', request.url))
    }

    // 세션이 있을 때 추가적인 검증이나 리다이렉트 로직(Navigator Lock 해결)
    if (session) {
      // 이 호출이 쿠키를 자동으로 동기화함
      await supabase.auth.getUser()
      console.log('✔️ Session validated for user:', session.user.email)
    }

    // 라우트 가드 로직
    const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || 
                        request.nextUrl.pathname.startsWith('/signup')

    const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') ||
                             request.nextUrl.pathname.startsWith('/profile')

    if (isProtectedRoute && !session) {
      // const loginUrl = new URL('/login', request.url)
      // loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      // return NextResponse.redirect(loginUrl)

      console.log('🚫 Protected route accessed without session, redirecting to login')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isAuthRoute && session) {
      console.log('🔄 Authenticated user accessing auth route, redirecting to dashboard')
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

  } catch (error) {
    console.warn('💥 Middleware session check failed:', error)

    // 심각한 에러 시 로그인으로 리다이렉트
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * 다음 경로들을 제외한 모든 요청에 미들웨어 적용:
     * - api routes (API 라우트는 별도 처리)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화)
     * - favicon.ico (파비콘)
     * - 이미지 파일들
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}