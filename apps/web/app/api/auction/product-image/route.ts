import { NextRequest, NextResponse } from 'next/server';

import { supabase } from '@/shared/lib/supabase/supabase';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // 확장자 및 타입 체크
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    return NextResponse.json({ error: 'jpg, png 파일만 업로드할 수 있습니다.' }, { status: 400 });
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;

  // Supabase Storage 업로드
  const { data, error } = await supabase.storage
    .from('auction-image')
    .upload(fileName, file, { upsert: false });

  if (error) {
    return NextResponse.json({ error: '이미지 업로드 실패: ' + error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from('auction-image').getPublicUrl(data.path);

  if (!urlData?.publicUrl) {
    return NextResponse.json({ error: '이미지 URL 생성 실패' }, { status: 500 });
  }

  return NextResponse.json({ url: urlData.publicUrl });
}
