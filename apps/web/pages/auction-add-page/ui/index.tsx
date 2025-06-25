'use client';

import { useState } from 'react';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { LocationInfo } from '@repo/ui/design-system/base-components/LocationInfo/index';
import { Select } from '@repo/ui/design-system/base-components/Select/index';

import { AuctionDateSelector } from '../../../entities/auction/ui/AuctionDateSelector';
import { AuctionImageUploader } from '../../../entities/auction/ui/AuctionImageUploader';
import { ProductDescriptionInput } from '../../../entities/auction/ui/ProductDescriptionInput';
import { useCreateAuction } from '../../../hooks/useCreateAuction';
import { auctionAddSchema } from '../../../lib/validators/auctionAddSchema';
import { categories } from '../../../mock/auction';
import {
  handleDateChange,
  handleInputChange,
  handleSelectChange,
  handleStartPriceInput,
  handleTextareaChange,
} from '../model/handlers';

const getToday = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0] as string;
};

export const AuctionAddPage = () => {
  const [auctionName, setAuctionName] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [auctionCategory, setAuctionCategory] = useState('');
  const [auctionDescription, setAuctionDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>(getToday());
  const [endDate, setEndDate] = useState<string>(getToday());
  const [, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const createAuctionMutation = useCreateAuction();

  // 등록 버튼 클릭 시 유효성 검사 및 서버 전송
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});
    const result = auctionAddSchema.safeParse({
      images, // string[] (url)
      auctionName,
      auctionCategory,
      startPrice,
      auctionDescription,
      startDate,
      endDate,
    });
    if (!result.success) {
      // 각 필드별 에러 메시지 추출
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0]] = err.message;
      });
      setFieldErrors(errors);
      setFormError(result.error.errors[0]?.message || '입력값을 확인해 주세요.');
      return;
    }
    // 서버 전송 로직 (react-query mutation)
    const payload = {
      name: auctionName,
      category: auctionCategory,
      description: auctionDescription,
      start_price: Number(startPrice),
      start_time: startDate,
      end_time: endDate,
      thumbnail: images[0] || '',
      images: images, // string[] (url 배열)
    };
    createAuctionMutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/*사진 등록 및 위치*/}
      <AuctionImageUploader images={images} setImages={setImages} />
      {fieldErrors.images && (
        <div className="my-1 ml-1 text-xs text-red-500">{fieldErrors.images}</div>
      )}
      <LocationInfo locationName="서울시 강남구" />
      {/*경매 정보 입력*/}
      <section className="mt-4 flex w-full max-w-md flex-col gap-4">
        <div className="flex flex-col">
          <Input
            label="경매 이름"
            value={auctionName}
            onChange={(e) => handleInputChange(e, setAuctionName, 'auctionName', setFieldErrors)}
          />
          {fieldErrors.auctionName && (
            <div className="my-1 ml-1 text-xs text-red-500">{fieldErrors.auctionName}</div>
          )}
        </div>
        <div className="flex flex-col">
          <Select
            label="경매 카테고리"
            value={auctionCategory}
            onChange={(e) =>
              handleSelectChange(e, setAuctionCategory, 'auctionCategory', setFieldErrors)
            }
            options={categories.map((c: { title: string }) => c.title)}
            id="auctionCategory"
          />
          {fieldErrors.auctionCategory && (
            <div className="my-1 ml-1 text-xs text-red-500">{fieldErrors.auctionCategory}</div>
          )}
        </div>
        <div className="flex flex-col">
          <Input
            label="경매 시작가"
            value={startPrice}
            onChange={(e) => handleStartPriceInput(e, setStartPrice, setFieldErrors)}
          />
          {fieldErrors.startPrice && (
            <div className="my-1 ml-1 text-xs text-red-500">{fieldErrors.startPrice}</div>
          )}
        </div>
        {/* 날짜 선택 컴포넌트 */}
        <div className="flex flex-col">
          <AuctionDateSelector
            startDate={startDate}
            endDate={endDate}
            setStartDate={(date) =>
              handleDateChange(date, setStartDate, 'startDate', setFieldErrors)
            }
            setEndDate={(date) => handleDateChange(date, setEndDate, 'endDate', setFieldErrors)}
          />
          {(fieldErrors.startDate || fieldErrors.endDate) && (
            <div className="my-1 ml-1 text-xs text-red-500">
              {fieldErrors.startDate || fieldErrors.endDate}
            </div>
          )}
        </div>
        {/* 상품 정보 입력 */}
        <div className="flex flex-col">
          <ProductDescriptionInput
            value={auctionDescription}
            onChange={(e) =>
              handleTextareaChange(e, setAuctionDescription, 'auctionDescription', setFieldErrors)
            }
          />
          {fieldErrors.auctionDescription && (
            <div className="my-1 ml-1 text-xs text-red-500">{fieldErrors.auctionDescription}</div>
          )}
        </div>
        <Button variants="primary" type="submit">
          경매 등록
        </Button>
      </section>
    </form>
  );
};
