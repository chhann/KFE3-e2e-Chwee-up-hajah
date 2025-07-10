import { createApiClient } from '@/app/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/';

  if (code) {
    const response = NextResponse.redirect(requestUrl.origin + next);
    const supabase = createApiClient(request, response);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.json({
        success: true,
        redirectTo: requestUrl.origin + '/password-reset-confirm',
      });
    }
  }

  // return the user to an error page with some error message
  return NextResponse.redirect(requestUrl.origin + '/error');
}
