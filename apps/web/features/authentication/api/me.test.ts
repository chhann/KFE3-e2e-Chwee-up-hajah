import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MeService } from './me';
import { createClient } from '@/app/client';

// Mock Supabase client
const mockGetUser = vi.fn();
const mockSupabaseClient = {
  auth: {
    getUser: mockGetUser,
  },
};

vi.mock('@/app/client', () => ({
  createClient: vi.fn(() => mockSupabaseClient),
}));

describe('MeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCurrentUser', () => {
    it('should return the user object if successfully logged in', async () => {
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });

      const user = await MeService.getCurrentUser();

      expect(createClient).toHaveBeenCalledTimes(1);
      expect(mockGetUser).toHaveBeenCalledTimes(1);
      expect(user).toEqual(mockUser);
    });

    it('should throw an error if getUser fails', async () => {
      const errorMessage = 'Supabase error';
      mockGetUser.mockResolvedValue({ data: { user: null }, error: { message: errorMessage } });

      await expect(MeService.getCurrentUser()).rejects.toThrow('로그인이 필요합니다.');
      expect(createClient).toHaveBeenCalledTimes(1);
      expect(mockGetUser).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if user is null after successful getUser call', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null }, error: null });

      await expect(MeService.getCurrentUser()).rejects.toThrow('로그인이 필요합니다.');
      expect(createClient).toHaveBeenCalledTimes(1);
      expect(mockGetUser).toHaveBeenCalledTimes(1);
    });
  });
});
