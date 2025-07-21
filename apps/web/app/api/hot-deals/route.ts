import { createSSRClient } from '@/app/server';
import { hotDealSchema } from '@/shared/lib/validators/hot-deal';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createSSRClient();
  const { data, error } = await supabase.from('hot_deals').select('*');

  if (error) {
    console.error('Supabase GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createSSRClient();
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
