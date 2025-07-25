import { createApiClient, createSSRClient } from '@/app/server';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createSSRClient();

  const { data, error } = await supabase
    .from('event_popups')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = createApiClient(request);
  const body = await request.json();
  const { image_url, redirect_url, is_active, priority, start_date, end_date } = body;

  if (!image_url || !redirect_url || !start_date || !end_date) {
    return NextResponse.json({ error: '모든 필수 필드를 입력해야 합니다.' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('event_popups')
    .insert({
      image_url,
      redirect_url,
      is_active,
      priority,
      start_date,
      end_date,
    })
    .select()
    .single();

  if (error) {
    console.error('Supbase POST error', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const supabase = createApiClient(request);
  const body = await request.json();

  const { id, ...updateFields } = body;

  if (!id) {
    return NextResponse.json({ error: '업데이트할 팝업의 id가 필요합니다.' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('event_popups')
    .update(updateFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
