export const uploadAvatarToStorage = async (id: string, file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('userId', id);
  formData.append('avatarFile', file);

  const response = await fetch('/api/profile/upload-avatar', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to upload avatar');
  }

  const { publicUrl } = await response.json();
  return publicUrl;
};
