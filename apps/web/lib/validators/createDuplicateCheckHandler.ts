// lib/validator/createDuplicateCheckHandler.ts

import { NextRequest, NextResponse } from 'next/server';

type DuplicateCheckFn = (
  value: string
) => Promise<{ status: number; success?: boolean; error?: string }>;

export function createDuplicateCheckHandler(checkFn: DuplicateCheckFn, fieldLabel: string) {
  return async (request: NextRequest) => {
    try {
      const { value } = await request.json();

      if (!value || typeof value !== 'string') {
        return NextResponse.json(
          { error: `${fieldLabel}이 누락되었거나 유효하지 않습니다.` },
          { status: 400 }
        );
      }

      const result = await checkFn(value);

      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: result.status });
      }

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error(`${fieldLabel} 중복 확인 API 에러:`, error);
      return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
  };
}
