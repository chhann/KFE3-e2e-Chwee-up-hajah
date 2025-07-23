import { HotDeal } from '@/shared/types/db';
import { ProgressBar } from '@/widgets/progress-bar';

interface HotdealInfoCardProps {
  data: HotDeal;
  countdown: {
    minutes: string;
    seconds: string;
    message: string;
    isTimeUp: boolean;
  };
}

export const HotdealInfoCard = ({ data, countdown }: HotdealInfoCardProps) => {
  // ProgressBar 및 가격 표시에 사용할 데이터 계산
  const discount = data.start_price - data.current_price;
  const totalDiscount = data.start_price - data.min_price;
  const progressPercent = totalDiscount > 0 ? (discount / totalDiscount) * 100 : 0;
  const discountPercent = data.start_price > 0 ? (discount / data.start_price) * 100 : 0;

  const progressData = {
    startPrice: data.start_price,
    finalPrice: data.min_price,
    currentPrice: data.current_price,
    discount,
    totalDiscount,
    progressPercent,
  };
  return (
    <div>
      <div className="flex w-full flex-col gap-2">
        <img src={data.image_url} alt={data.name} />
        <div className="flex flex-col gap-1">
          <div className="flex justify-between font-light">
            <div className="font-[var(--font-bold)]">{data.name}</div>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-xs text-[var(--text-disabled)] line-through">
                {data.start_price.toLocaleString()}원
              </div>
              <div className="flex gap-2">
                <div className="text-red-500">{parseFloat(discountPercent.toFixed(2))}%</div>
                <div className="font-[var(--font-bold)]">
                  {data.current_price.toLocaleString()}원
                </div>
              </div>
            </div>
            <div className="text-right">
              <div>{countdown.message}</div>
              <div className="text-[var(--text-error)]">
                {countdown.minutes}:{countdown.seconds}
              </div>
            </div>
          </div>
          <ProgressBar progressData={progressData} />
          <div className="flex justify-between">
            <div>
              <div>총 수량</div>
              <div>{data.total_quantity}개</div>
            </div>
            <div className="text-right">
              <div>남은 수량</div>
              <div className="font-[var(--font-bold)]">{data.current_quantity}개</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <h2 className="text-lg font-[var(--font-semibold)]">상품 설명</h2>
        <div className="whitespace-pre-line">{data.description}</div>
      </div>
    </div>
  );
};
