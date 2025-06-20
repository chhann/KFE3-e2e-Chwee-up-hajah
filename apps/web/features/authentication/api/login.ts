// features/authentication/api/login.ts
import { createClient } from '../../../utils/supabase/client';

export class LoginService {
  static async login(email: string, password: string): Promise<string> {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('로그인에 실패했습니다.');
    }

    return data.user.id;
  }

  static async logout(): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new Error(error.message);
    }
  }

  static async getCurrentUser() {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return user;
  }
}