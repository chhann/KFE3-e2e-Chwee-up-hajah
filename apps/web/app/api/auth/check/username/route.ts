// app/api/auth/check/username/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { checkUsernameDuplicate } from '../../../../../lib/validators/duplicateCheck';

export async function POST(request: NextRequest) {
  try {
    const { value } = await request.json();
    if (!value) {
      return NextResponse.json({ error: '닉네임이 누락되었습니다.' }, { status: 400 });
    }

    const result = await checkUsernameDuplicate(value);
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('닉네임 중복 확인 API 에러:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
