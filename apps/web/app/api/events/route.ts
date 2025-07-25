import { createApiClient, createSSRClient } from '@/app/server';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createSSRClient();
  const { data, error } = await supabase.from('events').select('*');

  if (error) {
    console.error('Supabase GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = createApiClient(request);
  const body = await request.json();
  const { imageUrl, redirectUrl, startTime, endTime, is_active } = body;

  if (!imageUrl || !redirectUrl || !startTime || !endTime) {
    return NextResponse.json({ error: '모든 필수 필드를 입력해야 합니다.' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('events')
    .insert({
      imageUrl: imageUrl,
      redirectUrl: redirectUrl,
      startTime: startTime,
      endTime: endTime,
      is_active: is_active,
    })
    .select()
    .single();

  if (error) {
    console.error('Supbase POST error', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
