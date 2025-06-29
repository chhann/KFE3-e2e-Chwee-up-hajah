import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLogin } from './useLogin';
import { useAuthStore } from '../stores/auth';

// next/navigation 모의 처리
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// useAuthStore 모의 처리
const mockLogin = vi.fn();
const mockSetState = vi.fn();

vi.mock('../stores/auth', () => ({
    useAuthStore: vi.fn(),
}));

describe('useLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // useAuthStore 모의 구현
    (useAuthStore as vi.Mock).mockImplementation((selector) => {
        const state = {
            login: mockLogin,
            error: null,
            isAuthenticated: false,
            ...mockSetState.mock.calls[0]?.[0],
        };
        return selector(state);
    });

    // getState 모의 구현
    useAuthStore.getState = vi.fn().mockReturnValue({ isAuthenticated: false });
  });

  it('should update email and password state on change', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.onChangeEmail({ target: { value: 'test@email.com' } } as React.ChangeEvent<HTMLInputElement>);
      result.current.onChangePassword({ target: { value: 'password123' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.email).toBe('test@email.com');
    expect(result.current.password).toBe('password123');
  });

  it('should call auth store login on submit', async () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
        result.current.onChangeEmail({ target: { value: 'test@email.com' } } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangePassword({ target: { value: 'password123' } } as React.ChangeEvent<HTMLInputElement>);
      });

    await act(async () => {
      await result.current.onSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(mockLogin).toHaveBeenCalledWith('test@email.com', 'password123');
  });

  it('should redirect to dashboard on successful login', async () => {
    // 로그인 성공 시나리오 모의
    useAuthStore.getState = vi.fn().mockReturnValue({ isAuthenticated: true });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.onSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('should not redirect on failed login', async () => {
    // 로그인 실패 시나리오 모의
    useAuthStore.getState = vi.fn().mockReturnValue({ isAuthenticated: false });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.onSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});