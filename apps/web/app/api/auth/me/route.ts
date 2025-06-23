import { NextResponse } from 'next/server';
import { createSSRClient } from '../../../server';

export async function GET() {
  const supabase = await createSSRClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: data.user });
}
