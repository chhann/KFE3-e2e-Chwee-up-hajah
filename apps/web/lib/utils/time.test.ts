
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTimeRemaining } from './time';

describe('getTimeRemaining', () => {
  // 테스트를 위해 현재 시간을 고정합니다.
  const mockNow = new Date('2025-06-28T12:00:00.000Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the correct remaining time when the end time is in the future', () => {
    // 1일 2시간 3분 4초 후
    const futureEndTime = new Date('2025-06-29T14:03:04.000Z').toISOString();
    const remaining = getTimeRemaining(futureEndTime);

    expect(remaining.isEnded).toBe(false);
    expect(remaining.days).toBe(1);
    expect(remaining.hours).toBe(2);
    expect(remaining.minutes).toBe(3);
    expect(remaining.seconds).toBe(4);
  });

  it('should indicate the auction has ended when the end time is in the past', () => {
    const pastEndTime = new Date('2025-06-27T12:00:00.000Z').toISOString();
    const remaining = getTimeRemaining(pastEndTime);

    expect(remaining.isEnded).toBe(true);
    expect(remaining.total).toBeLessThanOrEqual(0);
  });

  it('should indicate the auction has ended when the end time is now', () => {
    const nowEndTime = new Date('2025-06-28T12:00:00.000Z').toISOString();
    const remaining = getTimeRemaining(nowEndTime);

    expect(remaining.isEnded).toBe(true);
    expect(remaining.total).toBe(0);
  });
});
