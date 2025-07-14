import { NextRequest, NextResponse } from 'next/server';

import { adminClient } from '@/app/admin';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = formData.get('userId') as string;
    const avatarFile = formData.get('avatarFile') as File;

    if (!userId || !avatarFile) {
      return NextResponse.json(
        { message: 'User ID and avatar file are required' },
        { status: 400 }
      );
    }

    const fileExt = avatarFile.name.split('.').pop();
    const filePath = `${userId}.${fileExt}`;

    const exts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    await adminClient.storage.from('avatars').remove(exts.map((ext) => `${userId}.${ext}`));

    const { data, error: uploadError } = await adminClient.storage
      .from('avatars')
      .upload(filePath, avatarFile, {
        upsert: true, // 파일이 이미 존재하면 덮어쓰기
        cacheControl: '3600', // CDN 캐시 시간 (초 단위)
      });

    if (uploadError) {
      console.error('Supabase Storage upload error:', uploadError);
      return NextResponse.json(
        { message: 'Failed to upload avatar', error: uploadError.message },
        { status: 500 }
      );
    }

    const { data: urlData } = adminClient.storage.from('avatars').getPublicUrl(data.path);

    return NextResponse.json({ publicUrl: urlData.publicUrl });
  } catch (error) {
    console.error('Error in avatar upload API:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
