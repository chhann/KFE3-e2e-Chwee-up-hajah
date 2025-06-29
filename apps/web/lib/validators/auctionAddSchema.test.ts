
import { describe, it, expect } from 'vitest';
import { auctionAddSchema } from './auctionAddSchema';

describe('auctionAddSchema', () => {
  const validData = {
    images: ['image1.jpg'],
    auctionName: 'Test Auction',
    auctionCategory: 'Electronics',
    startPrice: '100',
    auctionDescription: 'This is a test auction.',
    startDate: '2025-07-01',
    endDate: '2025-07-10',
  };

  it('should pass with valid data', () => {
    const result = auctionAddSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail if images array is empty', () => {
    const result = auctionAddSchema.safeParse({ ...validData, images: [] });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe('사진을 1장 이상 등록해 주세요.');
  });

  it('should fail if images array has more than 5 items', () => {
    const images = Array(6).fill('image.jpg');
    const result = auctionAddSchema.safeParse({ ...validData, images });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe('사진은 최대 5장까지 등록할 수 있습니다.');
  });

  it('should fail with an empty auction name', () => {
    const result = auctionAddSchema.safeParse({ ...validData, auctionName: '' });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe('경매 이름을 입력해 주세요.');
  });

  it('should fail with an empty auction category', () => {
    const result = auctionAddSchema.safeParse({ ...validData, auctionCategory: '' });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe('경매 카테고리를 선택해 주세요.');
  });

  it('should fail with an empty start price', () => {
    const result = auctionAddSchema.safeParse({ ...validData, startPrice: '' });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe('경매 시작가를 입력해 주세요.');
  });

  it('should fail with an empty auction description', () => {
    const result = auctionAddSchema.safeParse({ ...validData, auctionDescription: '' });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe('상품 정보를 입력해 주세요.');
  });

  it('should fail with an empty start date', () => {
    const result = auctionAddSchema.safeParse({ ...validData, startDate: '' });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe('경매 시작일을 선택해 주세요.');
  });

  it('should fail with an empty end date', () => {
    const result = auctionAddSchema.safeParse({ ...validData, endDate: '' });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe('경매 종료일을 선택해 주세요.');
  });
});
