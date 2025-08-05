import { createApiClient } from '@/app/server';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const response = new NextResponse();
  const supabase = createApiClient(request, response);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return NextResponse.json(
      {
        userId: session.user.id,
      },
      { status: 200, headers: response.headers }
    );
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: response.headers });
}
