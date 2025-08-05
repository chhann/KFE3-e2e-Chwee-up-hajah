'use client';

import { useState } from 'react';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Card } from '@repo/ui/design-system/base-components/Card/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { Select } from '@repo/ui/design-system/base-components/Select/index';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

import { LoadingSpinner } from '@/widgets/loading-spiner';

import { productDescriptionStyle } from '@/features/auction-add/ui/styles/ProductDescriptionInput.styles';

import { fetchHotdealList } from '@/shared/api/server/hotdeal/fetchHotdealList';
import { type HotDeal, hotDealSchema } from '@/shared/lib/validators/hot-deal';

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
    console.error('Failed to create hot deal:', response);
    throw new Error('핫딜을 생성하는 데 실패했습니다.');
  }
  return response.json();
};

const updateHotDeal = async ({
  id,
  is_active,
}: {
  id: string;
  is_active: boolean;
}): Promise<HotDeal> => {
  const response = await fetch(`/api/hot-deals`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, is_active }),
  });
  if (!response.ok) {
    throw new Error('핫딜 상태를 업데이트하는 데 실패했습니다.');
  }
  return response.json();
};

export default function HotDealsClient() {
  const queryClient = useQueryClient();
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const nowForMin = new Date(now.getTime() - offset).toISOString().slice(0, 16);

  const [startTimeError, setStartTimeError] = useState('시작 시간을 선택해주세요.');
  const [endTimeError, setEndTimeError] = useState('종료 시간을 선택해주세요.');

  const [newHotDeal, setNewHotDeal] = useState<Omit<HotDeal, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    description: '',
    image_url: 'https://picsum.photos/300/200?random=2',
    start_time: new Date(Date.now()).toISOString(),
    end_time: new Date(Date.now()).toISOString(),
    total_quantity: 100,
    current_quantity: 100,
    start_price: 10000,
    current_price: 10000,
    price_drop_interval_minutes: 60,
    price_drop_amount: 1000,
    min_price: 100,
    min_user_grade: 'bronze',
    waiting_time: 1,
    is_active: true,
  });

  const {
    data: hotDeals,
    isLoading,
    isError,
    error,
  } = useQuery<HotDeal[]>({
    queryKey: ['hotDeals'],
    queryFn: fetchHotdealList,
  });

  const createMutation = useMutation({
    mutationFn: createHotDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotDeals'] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateHotDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotDeals'] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleInputChange = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setNewHotDeal: React.Dispatch<
      React.SetStateAction<Omit<HotDeal, 'id' | 'created_at' | 'updated_at'>>
    >
  ) => {
    const { value } = e.target;

    const isNumbericString = /^\d*$/.test(value);
    if (isNumbericString) {
      if (value === '') {
        setNewHotDeal((prev) => ({
          ...prev,
          [name]: '',
        }));
        return;
      }
      const numValue = parseInt(value, 10);
      setNewHotDeal((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setNewHotDeal((prev) => ({ ...prev, [name]: value }));
    }
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

  // 시작 시간 변경 핸들러
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTimeValue = e.target.value;
    const newStartTime = new Date(newStartTimeValue);

    const now = new Date();
    now.setSeconds(0, 0);
    if (newStartTime < now) {
      setStartTimeError('지난 시간은 선택할 수 없습니다.');
    } else {
      setStartTimeError('');
    }

    const endTime = new Date(newHotDeal.end_time);
    if (endTime < newStartTime) {
      setEndTimeError('시작 시간보다 종료 시간이 늦어야 합니다.');
    } else {
      setEndTimeError('');
    }

    setNewHotDeal((prev) => ({
      ...prev,
      start_time: newStartTime.toISOString(),
    }));
  };

  // 종료 시간 변경 핸들러
  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTimeValue = e.target.value;
    const newEndTime = new Date(newEndTimeValue);
    const startTime = new Date(newHotDeal.start_time);

    if (newEndTime < startTime) {
      setEndTimeError('시작 시간보다 종료 시간이 늦어야 합니다.');
    } else {
      setEndTimeError('');
    }

    setNewHotDeal((prev) => ({
      ...prev,
      end_time: newEndTime.toISOString(),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = hotDealSchema
      .omit({ id: true, created_at: true, updated_at: true })
      .safeParse(newHotDeal);

    if (!validation.success) {
      alert(
        validation.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join('\n')
      );
      return;
    }
    // DB에는 표준 형식의 데이터를 보냅니다.
    createMutation.mutate(validation.data);
  };

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
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
              placeholder="핫딜에 대한 설명을 입력하세요."
              name="설명"
              id="auctionDescription"
              className={productDescriptionStyle.productDescriptionTextareaStyle}
              value={newHotDeal.description}
              onChange={(e) => handleInputChange('description', e, setNewHotDeal)}
            />

            <span>시작 시간: </span>
            <input
              type="datetime-local"
              name="start_time"
              value={format(new Date(newHotDeal.start_time), "yyyy-MM-dd'T'HH:mm")}
              onChange={handleStartTimeChange}
            />

            {startTimeError && <p className="text-red-500">{startTimeError}</p>}
            <p></p>
            <span>종료 시간: </span>

            <input
              type="datetime-local"
              name="end_time"
              min={format(new Date(newHotDeal.start_time), "yyyy-MM-dd'T'HH:mm")}
              value={format(new Date(newHotDeal.end_time), "yyyy-MM-dd'T'HH:mm")}
              onChange={handleEndTimeChange}
            />
            {endTimeError && <p className="text-red-500">{endTimeError}</p>}
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
          <Input
            label="최소 가격"
            type="number"
            placeholder="최소 가격을 입력하세요"
            value={newHotDeal.min_price}
            onChange={(e) => handleInputChange('min_price', e, setNewHotDeal)}
          />
          <Select
            label="최소 사용자 등급"
            options={['씨앗', '새싹', '나무', '숲']}
            value={newHotDeal.min_user_grade}
            onChange={(e) => handleSelectChange('min_user_grade', e, setNewHotDeal)}
          />
          <div className=": mt-4">
            <span>테이블 활성화:</span>
            <input
              type="checkbox"
              className="mb-4 text-xl font-semibold"
              checked={newHotDeal.is_active}
              onChange={() => {
                setNewHotDeal({ ...newHotDeal, is_active: !newHotDeal.is_active });
              }}
            />
          </div>
        </div>
        <Button
          type="submit"
          variants="primary"
          className="bg-primary-50 mt-4"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? '추가 중...' : '핫딜 추가'}
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
                <div className="mt-4 flex items-center justify-between">
                  <p>
                    상태:{' '}
                    <span
                      className={`font-bold ${
                        deal.status === '진행중'
                          ? 'text-green-500'
                          : deal.status === '종료됨'
                            ? 'text-red-500'
                            : 'text-gray-500'
                      }`}
                    >
                      {deal.status}
                    </span>
                  </p>
                  <Button
                    variants={deal.is_active ? 'ghost' : 'primary'}
                    onClick={() =>
                      updateMutation.mutate({ id: deal.id, is_active: !deal.is_active })
                    }
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending
                      ? '변경 중...'
                      : deal.is_active
                        ? '비활성화'
                        : '활성화'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
