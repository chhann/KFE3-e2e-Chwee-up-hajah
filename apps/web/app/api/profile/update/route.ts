import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { id, username, address, addressDetail, avatarUrl } = await req.json();
  const { data, error } = await supabase
    .from('user')
    .update({
      username,
      address,
      address_detail: addressDetail,
      avatar: avatarUrl,
    })
    .eq('user_id', id)
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
