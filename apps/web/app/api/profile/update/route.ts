import { NextRequest, NextResponse } from 'next/server';

import { adminClient } from '@/app/admin';

export async function POST(req: NextRequest) {
  try {
    const { id, username, address, addressDetail, avatarUrl } = await req.json();

    const { data, error } = await adminClient
      .from('user')
      .update({
        username,
        address,
        address_detail: addressDetail,
        avatar: avatarUrl,
      })
      .eq('user_id', id)
      .select();

    if (error) {
      console.error('Profile update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error in profile update API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
