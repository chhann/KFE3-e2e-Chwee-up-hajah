// app/api/auth/signup/route.ts
import { createClient } from '../../../../utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface SignupRequest {
  email: string
  password: string
  username: string
  address: string
  addressDetail?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json()
    const { email, password, username, address, addressDetail } = body

    const supabase = await createClient()

    // 사전 중복 확인
    const [emailCheck, usernameCheck] = await Promise.all([
      supabase.from('user_profiles').select('email').eq('email', email).maybeSingle(),
      supabase.from('user_profiles').select('username').eq('username', username).maybeSingle()
    ])

    if (emailCheck.data) {
      return NextResponse.json({ error: '이미 가입된 이메일입니다.' }, { status: 409 })
    }
    if (usernameCheck.data) {
      return NextResponse.json({ error: '이미 사용 중인 닉네임입니다.' }, { status: 409 })
    }

    // Supabase Auth 회원가입
    const { data: signupResult, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          address,
          address_detail: addressDetail
        }
      }
    })

    if (signupError) {
      return NextResponse.json({ error: signupError.message }, { status: 400 })
    }

    // 인증 메일 발송 상태
    return NextResponse.json({
      success: true,
      needsVerification: !signupResult.session,
      message: '가입 확인 이메일을 발송했습니다. 이메일을 확인해주세요.'
    })
  } catch (error) {
    console.error('💥 Signup API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
