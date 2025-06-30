
import { describe, it, expect } from 'vitest';
import { SignupClientSchema, SignupServerSchema } from './auth';

describe('Auth Validators', () => {
  describe('SignupClientSchema', () => {
    const validData = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      username: 'tester',
      address: 'Seoul',
      addressDetail: 'Gangnam',
    };

    it('should pass with valid data', () => {
      const result = SignupClientSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail with an invalid email', () => {
      const result = SignupClientSchema.safeParse({ ...validData, email: 'invalid-email' });
      expect(result.success).toBe(false);
      expect(result.error?.errors[0].message).toBe('올바른 이메일 형식이 아닙니다.');
    });

    it('should fail with a short password', () => {
      const result = SignupClientSchema.safeParse({ ...validData, password: '1234567' });
      expect(result.success).toBe(false);
      expect(result.error?.errors[0].message).toBe('비밀번호는 8자 이상이어야 합니다.');
    });

    it('should fail with a short username', () => {
        const result = SignupClientSchema.safeParse({ ...validData, username: 'a' });
        expect(result.success).toBe(false);
        expect(result.error?.errors[0].message).toBe('닉네임은 2자 이상이어야 합니다.');
      });

    it('should fail if passwords do not match', () => {
      const result = SignupClientSchema.safeParse({ ...validData, confirmPassword: 'differentpassword' });
      expect(result.success).toBe(false);
      expect(result.error?.errors[0].message).toBe('비밀번호가 일치하지 않습니다.');
      expect(result.error?.errors[0].path).toContain('confirmPassword');
    });

    it('should fail with an empty address', () => {
        const result = SignupClientSchema.safeParse({ ...validData, address: '' });
        expect(result.success).toBe(false);
        expect(result.error?.errors[0].message).toBe('주소를 입력해주세요.');
      });
  });

  describe('SignupServerSchema', () => {
    const validServerData = {
        email: 'test@example.com',
        password: 'password123',
        username: 'tester',
        address: 'Seoul',
        addressDetail: 'Gangnam',
      };

      it('should pass with valid data without confirmPassword', () => {
        const result = SignupServerSchema.safeParse(validServerData);
        expect(result.success).toBe(true);
      });

      it('should fail with invalid data', () => {
        const result = SignupServerSchema.safeParse({ ...validServerData, email: 'invalid' });
        expect(result.success).toBe(false);
      });
  });
});
