import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginService } from './login';
import { createApiClient, createSSRClient } from '@/app/server';
import { NextRequest, NextResponse } from 'next/server';

// Mock next/server
vi.mock('next/server', () => ({
  NextRequest: vi.fn(),
  NextResponse: vi.fn(),
}));

// Mock Supabase client
vi.mock('@/app/server', () => ({
  createApiClient: vi.fn(() => ({
    auth: {
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
    },
  })),
  createSSRClient: vi.fn(() => ({
    auth: {
      signOut: vi.fn(),
      getUser: vi.fn(),
    },
  })),
}));

describe('LoginService', () => {
  let mockRequest: NextRequest;
  let mockResponse: NextResponse;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRequest = {} as NextRequest;
    mockResponse = {} as NextResponse;
  });

  describe('login', () => {
    it('should successfully log in a user and return their ID', async () => {
      const mockUserId = 'user-123';
      const mockEmail = 'test@example.com';
      const mockPassword = 'password123';

      (createApiClient as vi.Mock).mockReturnValue({
        auth: {
          signInWithPassword: vi.fn().mockResolvedValue({
            data: { user: { id: mockUserId } },
            error: null,
          }),
        },
      });

      const userId = await LoginService.login(
        mockEmail,
        mockPassword,
        mockRequest,
        mockResponse
      );

      expect(createApiClient).toHaveBeenCalledWith(mockRequest, mockResponse);
      expect(createApiClient().auth.signInWithPassword).toHaveBeenCalledWith({
        email: mockEmail,
        password: mockPassword,
      });
      expect(userId).toBe(mockUserId);
    });

    it('should throw an error if Supabase authentication fails', async () => {
      const errorMessage = 'Invalid credentials';
      (createApiClient as vi.Mock).mockReturnValue({
        auth: {
          signInWithPassword: vi.fn().mockResolvedValue({
            data: { user: null },
            error: { message: errorMessage },
          }),
        },
      });

      await expect(
        LoginService.login(mockRequest, mockResponse, 'test@example.com', 'wrongpass')
      ).rejects.toThrow(errorMessage);
    });

    it('should throw an error if user data is missing after successful authentication', async () => {
      (createApiClient as vi.Mock).mockReturnValue({
        auth: {
          signInWithPassword: vi.fn().mockResolvedValue({
            data: { user: null },
            error: null,
          }),
        },
      });

      await expect(
        LoginService.login(mockRequest, mockResponse, 'test@example.com', 'password123')
      ).rejects.toThrow('로그인에 실패했습니다.');
    });
  });
});
