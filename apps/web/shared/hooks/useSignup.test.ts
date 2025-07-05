import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from '../features/authentication/api/authService';
import { useSignup } from './useSignup';

// next/navigation 모킹
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// AuthService 모킹
vi.mock('../features/authentication/api/authService', () => ({
  AuthService: {
    checkEmailDuplicate: vi.fn(),
    checkUsernameDuplicate: vi.fn(),
    validateSignupData: vi.fn(),
    signup: vi.fn(),
  },
}));

describe('useSignup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    (AuthService.validateSignupData as vi.Mock).mockReturnValue({});
  });

  it('폼 입력 상태가 변경되면 업데이트된다', () => {
    const { result } = renderHook(() => useSignup());

    act(() => {
      result.current.onChangeEmail({
        target: { value: 'test@example.com' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.onChangePassword({
        target: { value: 'password123' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.onChangePasswordConfirm({
        target: { value: 'password123' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.onChangeUsername({
        target: { value: 'testuser' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.onChangeAddress({
        target: { value: 'Seoul' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.onChangeAddressDetail({
        target: { value: 'Gangnam' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.email).toBe('test@example.com');
    expect(result.current.password).toBe('password123');
    expect(result.current.confirmPassword).toBe('password123');
    expect(result.current.username).toBe('testuser');
    expect(result.current.address).toBe('Seoul');
    expect(result.current.addressDetail).toBe('Gangnam');
  });

  describe('중복 확인', () => {
    it('이메일 중복 확인 성공 시 success로 상태 변경', async () => {
      (AuthService.checkEmailDuplicate as vi.Mock).mockResolvedValue(undefined);
      const { result } = renderHook(() => useSignup());

      act(() => {
        result.current.onChangeEmail({
          target: { value: 'new@example.com' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await act(async () => {
        await result.current.onEmailDuplicateCheck();
      });

      expect(result.current.emailCheckStatus).toBe('success');
      expect(result.current.isCheckingEmail).toBe(false);
      expect(result.current.fieldErrors.email).toBeUndefined();
    });

    it('이메일 중복 확인 실패 시 error로 상태 변경', async () => {
      (AuthService.checkEmailDuplicate as vi.Mock).mockRejectedValue(
        new Error('이미 존재하는 이메일')
      );
      const { result } = renderHook(() => useSignup());

      act(() => {
        result.current.onChangeEmail({
          target: { value: 'exist@example.com' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await act(async () => {
        await result.current.onEmailDuplicateCheck();
      });

      expect(result.current.emailCheckStatus).toBe('error');
      expect(result.current.isCheckingEmail).toBe(false);
      expect(result.current.fieldErrors.email).toBe('이미 존재하는 이메일');
    });

    it('닉네임 중복 확인 성공 시 success로 상태 변경', async () => {
      (AuthService.checkUsernameDuplicate as vi.Mock).mockResolvedValue(undefined);
      const { result } = renderHook(() => useSignup());

      act(() => {
        result.current.onChangeUsername({
          target: { value: 'newuser' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await act(async () => {
        await result.current.onUsernameDuplicateCheck();
      });

      expect(result.current.usernameCheckStatus).toBe('success');
      expect(result.current.isCheckingUsername).toBe(false);
      expect(result.current.fieldErrors.username).toBeUndefined();
    });

    it('닉네임 중복 확인 실패 시 error로 상태 변경', async () => {
      (AuthService.checkUsernameDuplicate as vi.Mock).mockRejectedValue(
        new Error('사용 중인 닉네임')
      );
      const { result } = renderHook(() => useSignup());

      act(() => {
        result.current.onChangeUsername({
          target: { value: 'takenuser' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await act(async () => {
        await result.current.onUsernameDuplicateCheck();
      });

      expect(result.current.usernameCheckStatus).toBe('error');
      expect(result.current.isCheckingUsername).toBe(false);
      expect(result.current.fieldErrors.username).toBe('사용 중인 닉네임');
    });
  });

  describe('onSubmit', () => {
    const mockValidData = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      username: 'testuser',
      address: 'Seoul',
      addressDetail: 'Gangnam',
    };

    beforeEach(() => {
      (AuthService.checkEmailDuplicate as vi.Mock).mockResolvedValue(undefined);
      (AuthService.checkUsernameDuplicate as vi.Mock).mockResolvedValue(undefined);
      (AuthService.signup as vi.Mock).mockResolvedValue({ needsVerification: false });
    });

    it('성공 시 dashboard로 리디렉션', async () => {
      const { result } = renderHook(() => useSignup());

      act(() => {
        result.current.onChangeEmail({
          target: { value: mockValidData.email },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangePassword({
          target: { value: mockValidData.password },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangePasswordConfirm({
          target: { value: mockValidData.confirmPassword },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangeUsername({
          target: { value: mockValidData.username },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangeAddress({
          target: { value: mockValidData.address },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangeAddressDetail({
          target: { value: mockValidData.addressDetail },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await act(async () => {
        await result.current.onEmailDuplicateCheck();
        await result.current.onUsernameDuplicateCheck();
      });

      await act(async () => {
        await result.current.onSubmit({
          preventDefault: vi.fn(),
        } as unknown as React.FormEvent<HTMLFormElement>);
      });

      expect(AuthService.signup).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/main');
      expect(result.current.formError).toBe('');
    });

    it('needsVerification true 시 login으로 리디렉션', async () => {
      (AuthService.signup as vi.Mock).mockResolvedValue({ needsVerification: true });
      const { result } = renderHook(() => useSignup());

      act(() => {
        result.current.onChangeEmail({
          target: { value: mockValidData.email },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangePassword({
          target: { value: mockValidData.password },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangePasswordConfirm({
          target: { value: mockValidData.confirmPassword },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangeUsername({
          target: { value: mockValidData.username },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangeAddress({
          target: { value: mockValidData.address },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangeAddressDetail({
          target: { value: mockValidData.addressDetail },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await act(async () => {
        await result.current.onEmailDuplicateCheck();
        await result.current.onUsernameDuplicateCheck();
      });

      await act(async () => {
        await result.current.onSubmit({
          preventDefault: vi.fn(),
        } as unknown as React.FormEvent<HTMLFormElement>);
      });

      expect(mockPush).toHaveBeenCalledWith('/login');
    });

    it('중복 확인 실패 시 제출 방지', async () => {
      (AuthService.checkEmailDuplicate as vi.Mock).mockRejectedValue(new Error('이메일 중복'));
      const { result } = renderHook(() => useSignup());

      act(() => {
        result.current.onChangeEmail({
          target: { value: mockValidData.email },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangePassword({
          target: { value: mockValidData.password },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangePasswordConfirm({
          target: { value: mockValidData.confirmPassword },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangeUsername({
          target: { value: mockValidData.username },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangeAddress({
          target: { value: mockValidData.address },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onChangeAddressDetail({
          target: { value: mockValidData.addressDetail },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await act(async () => {
        await result.current.onEmailDuplicateCheck();
      });

      await act(async () => {
        await result.current.onSubmit({
          preventDefault: vi.fn(),
        } as unknown as React.FormEvent<HTMLFormElement>);
      });

      expect(AuthService.signup).not.toHaveBeenCalled();
      expect(result.current.formError).toBe('중복 확인이 필요합니다.');
    });
  });
});
