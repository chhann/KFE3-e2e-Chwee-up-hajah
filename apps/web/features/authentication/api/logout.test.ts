import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LogoutService } from './logout';
import { createSSRClient } from '@/app/server';

const mockSignOut = vi.fn();
const mockSupabaseClient = {
  auth: {
    signOut: mockSignOut,
  },
};

// Mock Supabase client
vi.mock('@/app/server', () => ({
  createSSRClient: vi.fn(() => mockSupabaseClient),
}));

describe('LogoutService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('logout', () => {
    it('should successfully log out a user', async () => {
      mockSignOut.mockResolvedValue({ error: null });

      await LogoutService.logout();

      expect(createSSRClient).toHaveBeenCalledTimes(1);
      expect(mockSignOut).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if Supabase signOut fails', async () => {
      const errorMessage = 'Logout failed';
      mockSignOut.mockResolvedValue({ error: { message: errorMessage } });

      await expect(LogoutService.logout()).rejects.toThrow(
        `[LogoutService] ${errorMessage}`
      );
      expect(createSSRClient).toHaveBeenCalledTimes(1);
      expect(mockSignOut).toHaveBeenCalledTimes(1);
    });
  });
});
