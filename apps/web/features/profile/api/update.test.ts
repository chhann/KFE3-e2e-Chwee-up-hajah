import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateProfile } from './update';
import { supabase } from '@/lib/supabase/supabase';

// Mock Supabase client
vi.mock('@/lib/supabase/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(),
        })),
      })),
    })),
  },
}));

describe('updateProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update user profile data on success', async () => {
    const mockUserId = 'user-123';
    const mockUpdateData = {
      username: 'updateduser',
      address: '456 New St',
      addressDetail: 'Suite 2',
      avatarUrl: 'new_avatar.jpg',
    };
    const mockUpdatedProfile = {
      user_id: mockUserId,
      ...mockUpdateData,
      address_detail: mockUpdateData.addressDetail,
      avatar: mockUpdateData.avatarUrl,
    };

    (supabase.from as vi.Mock).mockReturnValue({
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      select: vi.fn().mockResolvedValue({ data: [mockUpdatedProfile], error: null }),
    });

    const result = await updateProfile({
      id: mockUserId,
      ...mockUpdateData,
    });

    expect(supabase.from).toHaveBeenCalledWith('user');
    expect(supabase.from().update).toHaveBeenCalledWith({
      username: mockUpdateData.username,
      address: mockUpdateData.address,
      address_detail: mockUpdateData.addressDetail,
      avatar: mockUpdateData.avatarUrl,
    });
    expect(supabase.from().update().eq).toHaveBeenCalledWith('user_id', mockUserId);
    expect(supabase.from().update().eq().select).toHaveBeenCalledTimes(1);
    expect(result).toEqual([mockUpdatedProfile]);
  });

  it('should throw an error if the Supabase update fails', async () => {
    const mockUserId = 'user-123';
    const errorMessage = 'Failed to update profile';

    (supabase.from as vi.Mock).mockReturnValue({
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      select: vi.fn().mockResolvedValue({ data: null, error: { message: errorMessage } }),
    });

    await expect(
      updateProfile({
        id: mockUserId,
        username: 'test',
      })
    ).rejects.toThrow(errorMessage);
    expect(supabase.from).toHaveBeenCalledWith('user');
  });
});
