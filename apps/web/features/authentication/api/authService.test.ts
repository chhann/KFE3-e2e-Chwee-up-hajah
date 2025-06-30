
import { vi } from 'vitest';
import { AuthService } from './authService';

describe('AuthService', () => {
  it('should return true for a non-duplicate email', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Email is available' }),
    } as Response);

    const result = await AuthService.checkEmailDuplicate('test@example.com');
    expect(result).toBe(true);
  });

  it('should throw an error for a duplicate email', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Email already exists' }),
    } as Response);

    await expect(AuthService.checkEmailDuplicate('duplicate@example.com')).rejects.toThrow('Email already exists');
  });

  it('should throw an error for an empty email', async () => {
    await expect(AuthService.checkEmailDuplicate('')).rejects.toThrow('이메일을 입력해주세요.');
  });
});
