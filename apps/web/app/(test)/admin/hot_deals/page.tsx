'use client';

import { AuctionDateSelector } from '@/features/auction-add/ui/AuctionDateSelector';
import { productDescriptionStyle } from '@/features/auction-add/ui/styles/ProductDescriptionInput.styles';

import { type HotDeal, hotDealSchema } from '@/shared/lib/validators/hot-deal';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Card } from '@repo/ui/design-system/base-components/Card/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { Select } from '@repo/ui/design-system/base-components/Select/index';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';

// API 호출 함수
const getHotDeals = async (): Promise<HotDeal[]> => {
  const response = await fetch('/api/hot-deals');
  if (!response.ok) {
    throw new Error('핫딜 목록을 불러오는 데 실패했습니다.');
  }
  return response.json();
};

const createHotDeal = async (
  newHotDeal: Omit<HotDeal, 'id' | 'created_at' | 'updated_at'>
): Promise<HotDeal> => {
  const response = await fetch('/api/hot-deals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newHotDeal),
  });
  if (!response.ok) {
    throw new Error('핫딜을 생성하는 데 실패했습니다.');
  }
  return response.json();
};

export default function HotDealsClient() {
  const queryClient = useQueryClient();
  const [newHotDeal, setNewHotDeal] = useState<Omit<HotDeal, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    description: '',
    image_url: 'https://via.placeholder.com/150',
    start_time: new Date().toISOString().slice(0, 16),
    end_time: new Date().toISOString().slice(0, 16),
    total_quantity: 100,
    current_quantity: 100,
    start_price: 10000,
    current_price: 10000,
    price_drop_interval_minutes: 60,
    price_drop_amount: 1000,
    min_user_grade: 'bronze',
  });

  const {
    data: hotDeals,
    isLoading,
    isError,
    error,
  } = useQuery<HotDeal[]>({
    queryKey: ['hotDeals'],
    queryFn: getHotDeals,
  });

  const mutation = useMutation({
    mutationFn: createHotDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotDeals'] });
    },
  });

  const handleInputChange = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setNewHotDeal: React.Dispatch<
      React.SetStateAction<Omit<HotDeal, 'id' | 'created_at' | 'updated_at'>>
    >
  ) => {
    const isNumber = e.target.type === 'number';
    setNewHotDeal((prev) => ({
      ...prev,
      [name]: isNumber ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleCounterChange = (
    start: string,
    end: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setNewHotDeal: React.Dispatch<
      React.SetStateAction<Omit<HotDeal, 'id' | 'created_at' | 'updated_at'>>
    >
  ) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setNewHotDeal((prev) => ({
        ...prev,
        [start]: value,
        [end]: value,
      }));
    }
  };

  const handleSelectChange = (
    name: string,
    e: React.ChangeEvent<HTMLSelectElement>,
    setNewHotDeal: React.Dispatch<
      React.SetStateAction<Omit<HotDeal, 'id' | 'created_at' | 'updated_at'>>
    >
  ) => {
    setNewHotDeal((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Zod 검사를 위해 완전한 ISO 형식으로 임시 변환
    const dataToValidate = {
      ...newHotDeal,
      start_time: `${newHotDeal.start_time}:00Z`,
      end_time: `${newHotDeal.end_time}:00Z`,
    };

    const validation = hotDealSchema
      .omit({ id: true, created_at: true, updated_at: true })
      .safeParse(dataToValidate);

    if (!validation.success) {
      alert(validation.error.errors.map((err) => err.message).join('\n'));
      return;
    }
    // DB에는 표준 형식의 데이터를 보냅니다.
    mutation.mutate(validation.data);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다: {error.message}</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card
          imageSrc={newHotDeal.image_url}
          badgeVariant="best"
          title={newHotDeal.name}
          locationName="위치"
          endTime={newHotDeal.end_time}
          startTime={newHotDeal.start_time}
        />
        <h2 className="mb-4 text-xl font-semibold">새 핫딜 추가</h2>
        <div className="flex-1/2 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="이름"
            type="text"
            placeholder={'이름을 입력하세요'}
            value={newHotDeal.name}
            onChange={(e) => handleInputChange('name', e, setNewHotDeal)}
          />
          <Input
            label="이미지 URL"
            type="text"
            placeholder={'이름을 입력하세요'}
            value={newHotDeal.image_url}
            onChange={(e) => handleInputChange('image_url', e, setNewHotDeal)}
          />
          <div className="col-span-2">
            <p>설명</p>
            <textarea
              aria-label="설명"
              name="설명"
              id="auctionDescription"
              className={productDescriptionStyle.productDescriptionTextareaStyle}
              value={newHotDeal.description}
              onChange={(e) => handleInputChange('description', e, setNewHotDeal)}
            />
            <AuctionDateSelector
              startDate={newHotDeal.start_time.split('T')[0]!}
              endDate={newHotDeal.end_time.split('T')[0]!}
              setStartDate={(date) =>
                setNewHotDeal((prev) => {
                  // T를 기준으로 시간 부분을 분리하고, 없는 경우 기본값 '00:00'을 사용합니다.
                  const timePart = prev.start_time.split('T')[1] || '00:00';
                  return {
                    ...prev,
                    start_time: `${date}T${timePart}`,
                  };
                })
              }
              setEndDate={(date) =>
                setNewHotDeal((prev) => {
                  // T를 기준으로 시간 부분을 분리하고, 없는 경우 기본값 '00:00'을 사용합니다.
                  const timePart = prev.end_time.split('T')[1] || '00:00';
                  return {
                    ...prev,
                    end_time: `${date}T${timePart}`,
                  };
                })
              }
            />
          </div>
          <Input
            label="총 수량"
            placeholder="재고를 입력하세요"
            type="number"
            value={newHotDeal.total_quantity}
            onChange={(e) =>
              handleCounterChange('total_quantity', 'current_quantity', e, setNewHotDeal)
            }
          />
          <Input
            label="시작 가격"
            type="number"
            placeholder="시작 가격을 입력하세요"
            value={newHotDeal.start_price}
            onChange={(e) => handleCounterChange('start_price', 'current_price', e, setNewHotDeal)}
          />
          <Input
            label="가격 변동 주기(분)"
            type="number"
            placeholder="가격 변동 주기를 입력하세요"
            value={newHotDeal.price_drop_interval_minutes}
            onChange={(e) => handleInputChange('price_drop_interval_minutes', e, setNewHotDeal)}
          />
          <Input
            label="가격 변동량"
            type="number"
            placeholder="가격 변동량을 입력하세요"
            value={newHotDeal.price_drop_amount}
            onChange={(e) => handleInputChange('price_drop_amount', e, setNewHotDeal)}
          />
          <Select
            label="최소 사용자 등급"
            options={['새싹', '열매', '나무', '숲']}
            value={newHotDeal.min_user_grade}
            onChange={(e) => handleSelectChange('min_user_grade', e, setNewHotDeal)}
          />
        </div>
        <Button type="submit" variants="primary" className="mt-4" disabled={mutation.isPending}>
          {mutation.isPending ? '추가 중...' : '핫딜 추가'}
        </Button>
      </form>

      <div>
        <h2 className="mb-4 text-xl font-semibold">핫딜 목록</h2>
        <div className="space-y-4">
          {hotDeals?.map((deal) => {
            // deal.start_time과 deal.end_time이 문자열인지 확인
            if (typeof deal.start_time !== 'string' || typeof deal.end_time !== 'string') {
              // 유효하지 않은 데이터는 건너뛰거나 오류 처리
              return null;
            }

            const startDate = new Date(deal.start_time);
            const endDate = new Date(deal.end_time);

            return (
              <div key={deal.id} className="rounded-lg border p-4 shadow-sm">
                <Card
                  imageSrc={deal.image_url}
                  badgeVariant="best"
                  title={deal.name}
                  locationName="위치"
                  endTime={deal.end_time}
                  startTime={deal.start_time}
                />
                <h3 className="mt-2 font-bold">{deal.name}</h3>
                <p>{deal.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <span>
                    수량: {deal.current_quantity} / {deal.total_quantity}
                  </span>
                  <span className="ml-4">가격: {deal.current_price}원</span>
                  <span className="ml-4">
                    시작:{' '}
                    {isNaN(startDate.getTime())
                      ? '유효하지 않은 시간'
                      : format(startDate, 'yyyy-MM-dd HH:mm')}
                  </span>
                  <span className="ml-4">
                    종료:{' '}
                    {isNaN(endDate.getTime())
                      ? '유효하지 않은 시간'
                      : format(endDate, 'yyyy-MM-dd HH:mm')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
