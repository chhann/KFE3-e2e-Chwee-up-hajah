import { createApiClient, createSSRClient } from '@/app/server';
import { hotDealSchema } from '@/shared/lib/validators/hot-deal';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET() {
  const supabase = await createSSRClient();
  const { data, error } = await supabase.from('hot_deals').select('*');

  if (error) {
    console.error('Supabase GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const now = new Date().toISOString();

  const filteredData = data.map((deal) => {
    const startTime = new Date(deal.start_time).toISOString();
    const endTime = new Date(deal.end_time).toISOString();
    let status = '';

    if (deal.is_active === false) {
      status = '비활성화';
    } else if (startTime > now) {
      status = '대기중';
    } else if (endTime < now) {
      status = '종료됨';
    } else {
      status = '진행중';
    }

    return { ...deal, status };
  });

  return NextResponse.json(filteredData);
}

export async function POST(request: NextRequest) {
  const supabase = await createApiClient(request);
  const body = await request.json();

  const validation = hotDealSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.format() }, { status: 400 });
  }

  const { data, error } = await supabase.from('hot_deals').insert([validation.data]).select();

  if (error) {
    console.error('Supabase POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0], { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createApiClient(request);

  const body = await request.json();

  const patchSchema = z.object({
    id: z.string().uuid(),
    is_active: z.boolean(),
  });

  const validation = patchSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.format() }, { status: 400 });
  }

  const { id, is_active } = validation.data;

  const { data, error } = await supabase
    .from('hot_deals')
    .update({ is_active: is_active, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single(); // 하나의 레코드만 반환하도록 합니다.

  if (error) {
    console.error('Supabase PATCH error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
