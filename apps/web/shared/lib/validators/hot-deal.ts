import { z } from 'zod';

export const hotDealSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, '이름을 입력해주세요.'),
  description: z.string().min(1, '설명을 입력해주세요.'),
  image_url: z.string().url('유효한 URL을 입력해주세요.'),
  start_time: z.string().datetime('시작 날짜를 입력해주세요.'),
  end_time: z.string().datetime('종료 날짜를 입력해주세요.'),
  total_quantity: z.number().int().positive('재고는 0보다 커야 합니다.'),
  current_quantity: z.number().int().nonnegative(),
  start_price: z.number().positive('시작 가격은 0보다 커야 합니다.'),
  current_price: z.number().nonnegative(),
  price_drop_interval_minutes: z.number().int().positive('가격 변동 주기는 0보다 커야 합니다.'),
  price_drop_amount: z.number().positive('가격 변동량은 0보다 커야 합니다.'),
  min_price: z.number().nonnegative('최소 가격은 0 이상이어야 합니다.'),
  min_user_grade: z.string(),
  waiting_time: z.number().int().nonnegative('대기 시간은 0 이상이어야 합니다.'),
  is_active: z.boolean().default(true),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  status: z.string().optional(),
});

export type HotDeal = z.infer<typeof hotDealSchema>;
