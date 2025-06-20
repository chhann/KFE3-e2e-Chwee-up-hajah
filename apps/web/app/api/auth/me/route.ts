// app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import { MeService } from '../../../../features/authentication/api/me';

export async function GET() {
  try {
    const user = await MeService.getCurrentUser();
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
