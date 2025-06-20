// app/api/webhook/route.ts
import { createClient } from '../../../../utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// Webhook Secret 검증(Optional 보안)
const SUPABASE_WEBHOOK_SECRET = process.env.SUPABASE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { event, user } = body

    if (event !== 'user.created') {
      return NextResponse.json({ error: 'Unhandled event type' }, { status: 400 })
    }

    if (!user) {
      return NextResponse.json({ error: 'No user data received' }, { status: 400 })
    }

    const { id, email, user_metadata } = user
    const { username, address, address_detail } = user_metadata || {}

    const supabase = await createClient()

    const { error: insertError } = await supabase
      .from('user_profiles')
      .insert({
        id,
        email,
        username,
        address,
        address_detail,
        created_at: new Date().toISOString()
      })

    if (insertError) {
      console.error('💥 Webhook insert error:', insertError)
      return NextResponse.json({ error: 'DB insert failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('💥 Webhook error:', error)
    return NextResponse.json({ error: 'Webhook 처리 실패' }, { status: 500 })
  }
}
