import { createSSRClient } from './server';

export async function getCurrentUser() {
  try {
    const supabase = await createSSRClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('[getCurrentUser] error:', error.message);
      return null;
    }

    return user;
  } catch (error: unknown) {
    console.error('[getCurrentUser] unexpected error:', error);

    return null;
  }
}
