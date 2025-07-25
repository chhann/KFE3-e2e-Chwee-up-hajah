import { createSSRClient } from '@/app/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createSSRClient();
  const { data, error } = await supabase
    .from('event_popups')
    .select('*')
    .eq('is_active', true)
    .lte('start_date', new Date().toISOString())
    .gte('end_date', new Date().toISOString())
    .order('priority', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
