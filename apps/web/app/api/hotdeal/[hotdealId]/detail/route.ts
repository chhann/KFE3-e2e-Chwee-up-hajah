import { adminClient } from '@/app/admin';
import { NextRequest, NextResponse } from 'next/server';

// /api/hotdeal/[hotdealId]/detail
export async function GET(req: NextRequest, { params }: { params: { hotdealId: string } }) {
  const { hotdealId } = params;
  if (!hotdealId) {
    return NextResponse.json({ error: 'hotdealId is required' }, { status: 400 });
  }

  try {
    const { data, error } = await adminClient
      .from('hot_deals')
      .select('*')
      .eq('id', hotdealId)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Hotdeal not found' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown server error occurred';
    console.error('Catch block error:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
