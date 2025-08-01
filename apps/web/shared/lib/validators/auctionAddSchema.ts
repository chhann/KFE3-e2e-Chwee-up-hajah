import { z } from 'zod';

export const auctionAddSchema = z
  .object({
    images: z
      .array(z.string())
      .min(1, '사진을 1장 이상 등록해 주세요.')
      .max(5, '사진은 최대 5장까지 등록할 수 있습니다.'),
    auctionName: z
      .string()
      .trim()
      .min(1, '경매 이름을 입력해 주세요.')
      .max(20, '상품명은 20자 이하로 입력해 주세요')
      .regex(
        /^[a-zA-Z0-9ㄱ-ㅎ가-힣.,!?()\-_:;#\s]*$/,
        '특수 문자는 다음 특수문자만 사용할 수 있습니다\n. , ! ? ( ) _ - : ; #'
      )
      .refine(
        (val) => val === '' || /[a-zA-Z0-9ㄱ-ㅎ가-힣]/.test(val),
        '특수문자만으로는 입력할 수 없습니다.'
      ),
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
      )
      .refine(
        (val) => {
          const price = parseInt(val, 10);
          return price % 1000 === 0;
        },
        {
          message: '경매 시작가는 1,000원 단위여야 합니다.',
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
      .trim()
      .min(1, '상품 설명을 입력해 주세요.')
      .max(500, '상품 설명을 500자 이하로 입력해주세요')
      .regex(
        /^[a-zA-Z0-9ㄱ-ㅎ가-힣.,!?()\-_:;#\s]*$/,
        '특수 문자는 다음 특수문자만 사용할 수 있습니다\n . , ! ? ( ) _ - : ; #'
      )
      .refine(
        (val) => val === '' || /[a-zA-Z0-9ㄱ-ㅎ가-힣]/.test(val),
        '특수문자만으로는 입력할 수 없습니다.'
      ),
    startDate: z.string().min(1, '경매 시작일을 선택해 주세요.'),
    endDate: z.string().min(1, '경매 종료일을 선택해 주세요.'),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      return endDate >= startDate;
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

      // 시작가가 1000원일 경우, 입찰 단가는 1000원만 허용
      if (startPrice === 1000) {
        return bidUnitPrice === 1000;
      }

      // 그 외의 경우, 입찰 단가는 시작가의 50%를 초과할 수 없음
      return bidUnitPrice <= startPrice * 0.5;
    },
    {
      message: '입찰 단가는 시작가의 50%를 초과할 수 없습니다.',
      path: ['bidUnitPrice'],
    }
  );

export type AuctionAddFormType = z.infer<typeof auctionAddSchema>;
