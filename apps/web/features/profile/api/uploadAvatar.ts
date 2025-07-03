export const uploadAvatarToStorage = async (id: string, file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('userId', id);
    formData.append('avatarFile', file);

    const response = await fetch('/api/profile/upload-avatar', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload avatar: ${response.status} ${response.statusText}`);
    }

    const { publicUrl } = await response.json();
    return publicUrl;
  } catch (error: unknown) {
    console.error('[uploadAvatarToStorage] Error:', error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Unknown error occurred while uploading avatar');
  }
};
