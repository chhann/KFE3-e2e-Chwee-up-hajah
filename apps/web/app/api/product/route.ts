import { NextRequest, NextResponse } from 'next/server';

import { createSSRClient } from '../../server';

export async function GET(req: NextRequest) {
  const supabase = await createSSRClient();
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get('sort') ?? 'popular';
  const limit = searchParams.get('limit');

  let query = supabase.from('view_products_list').select('*');

  switch (sort) {
    case 'popular':
      query = query.order('bid_count', { ascending: false });
      if (limit) {
        query = query.limit(parseInt(limit, 10));
      }
      break;
    case 'latest':
      query = query.order('start_time', { ascending: false });
      break;
    case 'endingSoon':
      query = query.order('end_time', { ascending: true });
      break;
    default:
      break;
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
