import { z } from 'zod';

export const auctionAddSchema = z.object({
  images: z
    .array(z.string())
    .min(1, '사진을 1장 이상 등록해 주세요.')
    .max(5, '사진은 최대 5장까지 등록할 수 있습니다.'),
  auctionName: z.string().min(1, '경매 이름을 입력해 주세요.'),
  auctionCategory: z.string().min(1, '경매 카테고리를 선택해 주세요.'),
  startPrice: z.string().min(1, '경매 시작가를 입력해 주세요.'),
  auctionDescription: z.string().min(1, '상품 정보를 입력해 주세요.'),
  startDate: z.string().min(1, '경매 시작일을 선택해 주세요.'),
  endDate: z.string().min(1, '경매 종료일을 선택해 주세요.'),
});

export type AuctionAddFormType = z.infer<typeof auctionAddSchema>;
