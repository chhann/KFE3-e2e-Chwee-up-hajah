import { supabase } from '@/lib/supabase/supabase';

export const generateUploadUrl = async (id: string, file: File): Promise<string | undefined> => {
  const fileExt = file.name.split('.').pop();
  const filePath = `${id}.${fileExt}`;

  // 기존 파일 모두 삭제
  const exts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  await supabase.storage.from('avatars').remove(exts.map((ext) => `${id}.${ext}`));

  const { data, error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      upsert: true,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(data.path);
  return urlData.publicUrl;
};
