import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { updateProfile } from '../../features/profile/api/updateProfile';
import { useUpdateProfile } from './useUpdateProfile';

// Mock next/navigation
const mockPush = vi.fn();
const mockRefresh = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

// Mock updateProfile
vi.mock('../../features/profile/api/update', () => ({
  updateProfile: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useUpdateProfile', () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
    alertSpy.mockClear();
  });

  it('should call updateProfile and navigate on success', async () => {
    const mockProfileData = {
      id: 'user-123',
      username: 'newuser',
      address: 'new address',
      addressDetail: 'new detail',
      avatarUrl: 'new_avatar.jpg',
    };
    (updateProfile as vi.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });

    result.current.mutate(mockProfileData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(updateProfile).toHaveBeenCalledTimes(1);
    expect(updateProfile).toHaveBeenCalledWith(mockProfileData);
    expect(alertSpy).toHaveBeenCalledWith('프로필 정보가 수정되었습니다.');
    expect(mockRefresh).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/profile');
  });

  it('should show an alert on failure', async () => {
    const mockProfileData = {
      id: 'user-123',
      username: 'newuser',
      address: 'new address',
      addressDetail: 'new detail',
      avatarUrl: 'new_avatar.jpg',
    };
    const errorMessage = 'Update failed';
    (updateProfile as vi.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });

    result.current.mutate(mockProfileData);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(updateProfile).toHaveBeenCalledTimes(1);
    expect(updateProfile).toHaveBeenCalledWith(mockProfileData);
    expect(alertSpy).toHaveBeenCalledWith('오류가 발생했습니다. 다시 시도해주세요.');
    expect(mockRefresh).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
