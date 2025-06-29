
import { describe, it, expect } from 'vitest';
import { profileSchema } from './profileSchema';

describe('profileSchema', () => {
  const validData = {
    username: 'testuser',
    address: 'Seoul',
    addressDetail: 'Gangnam-gu',
    avatarUrl: 'http://example.com/avatar.jpg',
  };

  it('should pass with valid data', () => {
    const result = profileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail if username is empty', () => {
    const result = profileSchema.safeParse({ ...validData, username: '' });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe('닉네임을 입력해주세요.');
  });

  it('should fail if address is empty', () => {
    const result = profileSchema.safeParse({ ...validData, address: '' });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe('주소를 입력해주세요.');
  });

  it('should pass if addressDetail is empty (optional field)', () => {
    const result = profileSchema.safeParse({ ...validData, addressDetail: '' });
    expect(result.success).toBe(true);
  });

  it('should pass if addressDetail is missing (optional field)', () => {
    const { addressDetail, ...dataWithoutDetail } = validData;
    const result = profileSchema.safeParse(dataWithoutDetail);
    expect(result.success).toBe(true);
  });

  it('should pass if avatarUrl is empty (optional field)', () => {
    const result = profileSchema.safeParse({ ...validData, avatarUrl: '' });
    expect(result.success).toBe(true);
  });

  it('should pass if avatarUrl is missing (optional field)', () => {
    const { avatarUrl, ...dataWithoutAvatar } = validData;
    const result = profileSchema.safeParse(dataWithoutAvatar);
    expect(result.success).toBe(true);
  });
});
