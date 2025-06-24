import { NextRequest, NextResponse } from 'next/server';
import { LoginService } from '../../../../features/authentication/api/login';
import { createApiClient } from '../../../server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    let res = NextResponse.json({ success: true });
    const supabase = createApiClient(req, res);

    const userId = await LoginService.login(email, password, req, res);

    return NextResponse.json(
      { userId },
      {
        headers: res.headers,
      }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
