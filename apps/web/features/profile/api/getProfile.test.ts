import { supabase } from '@/shared/lib/supabase/supabase';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getProfile } from './getProfile';

// Mock Supabase client
vi.mock('@/lib/supabase/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
    })),
  },
}));

describe('getProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return user profile data on success', async () => {
    const mockUserId = 'user-123';
    const mockProfile = {
      user_id: mockUserId,
      username: 'testuser',
      email: 'test@example.com',
      address: '123 Main St',
      address_detail: 'Apt 1',
      avatar: 'avatar.jpg',
    };

    (supabase.from as vi.Mock).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: mockProfile, error: null }),
    });

    const result = await getProfile(mockUserId);

    expect(supabase.from).toHaveBeenCalledWith('user');
    expect(supabase.from().select).toHaveBeenCalledWith(
      'user_id, username, email, address, address_detail, avatar'
    );
    expect(supabase.from().select().eq).toHaveBeenCalledWith('user_id', mockUserId);
    expect(supabase.from().select().eq().single).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockProfile);
  });

  it('should throw an error if the Supabase query fails', async () => {
    const mockUserId = 'user-123';
    const errorMessage = 'Failed to fetch profile';

    (supabase.from as vi.Mock).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: { message: errorMessage } }),
    });

    await expect(getProfile(mockUserId)).rejects.toThrow(errorMessage);
    expect(supabase.from).toHaveBeenCalledWith('user');
  });
});
