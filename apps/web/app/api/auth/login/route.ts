import { NextRequest, NextResponse } from 'next/server';
import { LoginService } from '../../../../features/authentication/api/login';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const userId = await LoginService.login(email, password);

    return NextResponse.json({ userId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
