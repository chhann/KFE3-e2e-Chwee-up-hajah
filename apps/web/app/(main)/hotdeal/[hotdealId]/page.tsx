import { HotDealChart } from '@/widgets/hotdeal-chart';
import { ImageBanner } from '@/widgets/image-banner';
import { Button } from '@repo/ui/design-system/base-components/Button/index';

const page = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <ImageBanner images={['/mock-image/images.jpg', '/mock-image/images (1).jpg']} />
      <div className="flex flex-col gap-1 p-2">
        <div className="flex justify-between font-light">
          <div className="font-[var(--font-bold)]">빈티지 시계 한정판</div>
          <div className="text-xs">새싹등급(아이콘) 전용</div>
        </div>
        <div>
          <div className="text-xs text-[var(--text-disabled)] line-through">150,000원</div>
          <div className="font-[var(--font-bold)]">50,000원</div>
        </div>
        <div className="flex justify-between">
          <div>
            <div>다음 가격 하락</div>
            <div className="text-[var(--text-error)]">02:53</div>
          </div>
          <div className="text-right">
            <div>남은 수량</div>
            <div className="font-[var(--font-bold)]">5개</div>
          </div>
        </div>
      </div>

      <HotDealChart />

      <div className="mt-8 flex flex-col gap-2 p-2">
        <h2 className="text-lg font-[var(--font-semibold)]">상품 상세 설명</h2>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          이 빈티지 시계는 1970년대에 제작된 희귀 모델로, 정교한 수작업과 독특한 디자인이
          돋보입니다. 시간의 흔적이 고스란히 담겨 있어 단순한 시계를 넘어 하나의 예술 작품으로서의
          가치를 지닙니다. 수집가들 사이에서 높은 평가를 받고 있으며, 일상생활에서도 특별한 스타일을
          연출할 수 있습니다.
        </p>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          모든 부품은 오리지널 상태를 유지하고 있으며, 전문 시계 장인의 정밀 검수를 거쳐 최상의 작동
          상태를 보장합니다. 생활 방수 기능과 야광 인덱스가 적용되어 실용성 또한 뛰어납니다. 한정
          수량으로 진행되는 핫딜인 만큼, 이번 기회를 놓치지 마세요!
        </p>
        <h3 className="mt-2 text-base">주요 특징</h3>
        <ul className="list-inside list-disc text-sm leading-relaxed text-[var(--text-secondary)]">
          <li>1970년대 빈티지 오리지널 모델</li>
          <li>정교한 수작업 무브먼트</li>
          <li>생활 방수 및 야광 인덱스</li>
          <li>수집 가치 높은 희귀 아이템</li>
        </ul>
      </div>
      <Button
        variants="custom"
        className="sticky bottom-0 bg-purple-500 text-white transition-colors hover:bg-purple-600"
        size="thinLg"
      >
        지금 구매 (다음 하락까지 2:53)
      </Button>
    </div>
  );
};

export default page;
