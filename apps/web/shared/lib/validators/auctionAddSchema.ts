import { z } from 'zod';

export const auctionAddSchema = z
  .object({
    images: z
      .array(z.string())
      .min(1, '사진을 1장 이상 등록해 주세요.')
      .max(5, '사진은 최대 5장까지 등록할 수 있습니다.'),
    auctionName: z
      .string()
      .min(1, '경매 이름을 입력해 주세요.')
      .max(20, '상품명은 20자 이하로 입력해 주세요'),
    auctionCategory: z.string().min(1, '경매 카테고리를 선택해 주세요.'),
    startPrice: z
      .string()
      .min(1, '경매 시작가를 입력해 주세요.')
      .refine(
        (val) => {
          const price = parseInt(val, 10);
          return price >= 1000;
        },
        {
          message: '경매 시작가는 1,000원 이상이어야 합니다.',
        }
      ),
    bidUnitPrice: z
      .string()
      .min(1, '경매 입찰 단가를 입력해 주세요.')
      .refine(
        (val) => {
          const price = parseInt(val, 10);
          return price >= 1000;
        },
        {
          message: '입찰 단가는 1,000원 이상이어야 합니다.',
        }
      )
      .refine(
        (val) => {
          const price = parseInt(val, 10);
          return price % 1000 === 0;
        },
        {
          message: '입찰 단가는 1,000원 단위여야 합니다.',
        }
      ),

    auctionDescription: z
      .string()
      .min(10, '상품 설명은 10자 이상 입력해 주세요.')
      .max(500, '상품 설명을 500자 이하로 입력해주세요'),
    startDate: z.string().min(1, '경매 시작일을 선택해 주세요.'),
    endDate: z.string().min(1, '경매 종료일을 선택해 주세요.'),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      const differenceInMs = endDate.getTime() - startDate.getTime();
      const oneDayInMs = 24 * 60 * 60 * 1000;
      return differenceInMs >= oneDayInMs;
    },
    {
      message: '경매 종료일은 시작일 이후여야 합니다.',
      path: ['endDate'],
    }
  )
  .refine(
    (data) => {
      const startPrice = parseInt(data.startPrice, 10);
      const bidUnitPrice = parseInt(data.bidUnitPrice, 10);
      return bidUnitPrice <= startPrice * 0.5;
    },
    {
      message: '입찰 단가는 시작가의 50%를 초과할 수 없습니다.',
      path: ['bidUnitPrice'],
    }
  );

export type AuctionAddFormType = z.infer<typeof auctionAddSchema>;
