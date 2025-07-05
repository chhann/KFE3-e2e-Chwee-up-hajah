import { z } from 'zod';

export const profileSchema = z.object({
  username: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
  address: z.string().min(1, { message: '주소를 입력해주세요.' }),
  addressDetail: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export type Profile = z.infer<typeof profileSchema>;
