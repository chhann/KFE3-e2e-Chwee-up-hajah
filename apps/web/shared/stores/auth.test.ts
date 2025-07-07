import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from './auth';

// fetch API 모의 처리
global.fetch = vi.fn();

const createFetchResponse = (ok: boolean, data: any) => {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve(data),
  } as Response);
};

describe('useAuthStore', () => {
  // 각 테스트 실행 전에 스토어 상태 초기화
  beforeEach(() => {
    useAuthStore.setState({
      userId: null,
      isAuthenticated: false,
      isHydrated: true, // 테스트 시점에는 rehydrated 되었다고 가정
      error: null,
    });
    vi.clearAllMocks();
  });

  it('should have correct initial state', () => {
    const { userId, isAuthenticated, error } = useAuthStore.getState();
    expect(userId).toBeNull();
    expect(isAuthenticated).toBe(false);
    expect(error).toBeNull();
  });

  describe('login', () => {
    it('should log in successfully and update state', async () => {
      const mockUserId = 'user-123';
      (fetch as vi.Mock).mockResolvedValue(createFetchResponse(true, { userId: mockUserId }));

      await useAuthStore.getState().login('test@example.com', 'password');

      const { userId, isAuthenticated, error } = useAuthStore.getState();
      expect(userId).toBe(mockUserId);
      expect(isAuthenticated).toBe(true);
      expect(error).toBeNull();
      expect(fetch).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password' }),
      });
    });

    it('should handle login failure and set error message', async () => {
      (fetch as vi.Mock).mockResolvedValue(
        createFetchResponse(false, { error: 'Invalid credentials' })
      );

      await useAuthStore.getState().login('test@example.com', 'wrong-password');

      const { userId, isAuthenticated, error } = useAuthStore.getState();
      expect(userId).toBeNull();
      expect(isAuthenticated).toBe(false);
      expect(error).toBe('Invalid credentials');
    });

    it('should handle network error during login', async () => {
      (fetch as vi.Mock).mockRejectedValue(new Error('Network failed'));

      await useAuthStore.getState().login('test@example.com', 'password');

      const { error } = useAuthStore.getState();
      expect(error).toBe('Network failed');
    });
  });

  describe('logout', () => {
    it('should log out and reset state', () => {
      // 먼저 로그인 상태로 만듦
      useAuthStore.setState({ userId: 'user-123', isAuthenticated: true });

      useAuthStore.getState().logout();

      const { userId, isAuthenticated, error } = useAuthStore.getState();
      expect(userId).toBeNull();
      expect(isAuthenticated).toBe(false);
      expect(error).toBeNull();
    });
  });

  describe('restore', () => {
    it('should restore session successfully', async () => {
      const mockUserId = 'restored-user-456';
      (fetch as vi.Mock).mockResolvedValue(createFetchResponse(true, { userId: mockUserId }));

      await useAuthStore.getState().restore();

      const { userId, isAuthenticated } = useAuthStore.getState();
      expect(userId).toBe(mockUserId);
      expect(isAuthenticated).toBe(true);
      expect(fetch).toHaveBeenCalledWith('/api/auth/session');
    });

    it('should not restore session if request fails', async () => {
      (fetch as vi.Mock).mockResolvedValue(createFetchResponse(false, {}));

      await useAuthStore.getState().restore();

      const { userId, isAuthenticated } = useAuthStore.getState();
      expect(userId).toBeNull();
      expect(isAuthenticated).toBe(false);
    });
  });
});
