import { z } from 'zod';

export const hotDealSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, '이름을 입력해주세요.'),
  description: z.string().min(1, '설명을 입력해주세요.'),
  image_url: z.string().url('유효한 URL을 입력해주세요.'),
  start_time: z.string().datetime('유효한 날짜를 입력해주세요.'),
  end_time: z.string().datetime('유효한 날짜를 입력해주세요.'),
  total_quantity: z.number().int().positive('재고는 0보다 커야 합니다.'),
  current_quantity: z.number().int().nonnegative(),
  start_price: z.number().positive('시작 가격은 0보다 커야 합니다.'),
  current_price: z.number().nonnegative(),
  price_drop_interval_minutes: z.number().int().positive('가격 변동 주기는 0보다 커야 합니다.'),
  price_drop_amount: z.number().positive('가격 변동량은 0보다 커야 합니다.'),
  min_user_grade: z.string(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type HotDeal = z.infer<typeof hotDealSchema>;
