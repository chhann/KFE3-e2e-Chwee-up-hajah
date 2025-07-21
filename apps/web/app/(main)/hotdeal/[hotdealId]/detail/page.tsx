import { ProgressBar } from '@/widgets/progress-bar';
import { Button } from '@repo/ui/design-system/base-components/Button/index';

const page = () => {
  // fetch해온 데이터라고 가정
  const startPrice = 1350000;
  const finalPrice = 950000;
  const currentPrice = 1100000; // 현재 가격 (예시)

  // ProgressBar에 전달할 props 계산
  const discount = startPrice - currentPrice;
  const totalDiscount = startPrice - finalPrice;
  const progressPercent = (discount / totalDiscount) * 100;
  const discountPercent = (discount / startPrice) * 100;

  const progressData = {
    startPrice,
    finalPrice,
    currentPrice,
    discount,
    totalDiscount,
    progressPercent,
  };

  const description = `🔥 매일 오후 3시 핫딜 이벤트! 🔥 

          📱 빈티지 시계 한정판 - 정품 새제품 
          ✅ 공식 보증서 포함 
          ✅ 정품 박스 및 구성품 완비 
          ✅ 전국 무료배송 
          
          ⏰ 하향식 경매 방식 
          시작가: 1,350,000원
          매분 10,000원씩 가격 인하  
          먼저 입찰하는 분이 낙찰!
  `;
  return (
    <div className="flex w-full flex-col gap-2">
      <img src="/mock-image/images.jpg" alt="핫딜 이미지" />
      <div className="flex flex-col gap-1">
        <div className="flex justify-between font-light">
          <div className="font-[var(--font-bold)]">빈티지 시계 한정판</div>
        </div>
        <div className="flex justify-between">
          <div>
            <div className="text-xs text-[var(--text-disabled)] line-through">
              {startPrice.toLocaleString()}원
            </div>
            <div className="flex gap-2">
              <div className="text-red-500">{parseFloat(discountPercent.toFixed(2))}%</div>
              <div className="font-[var(--font-bold)]">{currentPrice.toLocaleString()}원</div>
            </div>
          </div>
          <div className="text-right">
            <div>다음 가격 인하</div>
            <div className="text-[var(--text-error)]">02:53</div>
          </div>
        </div>
        <ProgressBar progressData={progressData} />
        <div className="flex justify-between">
          <div>
            <div>총 수량</div>
            <div>100개</div>
          </div>
          <div className="text-right">
            <div>남은 수량</div>
            <div className="font-[var(--font-bold)]">5개</div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <h2 className="text-lg font-[var(--font-semibold)]">상품 설명</h2>
        <div className="whitespace-pre-line">{description}</div>
      </div>
      <Button
        variants="custom"
        className="sticky bottom-0 bg-purple-500 text-white transition-colors hover:bg-purple-600"
        size="thinLg"
      >
        지금 구매 (다음 인하까지 02:53)
      </Button>
    </div>
  );
};

export default page;
