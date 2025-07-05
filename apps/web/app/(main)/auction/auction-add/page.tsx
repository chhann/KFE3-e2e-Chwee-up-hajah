'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { LocationInfo } from '@repo/ui/design-system/base-components/LocationInfo/index';
import { Select } from '@repo/ui/design-system/base-components/Select/index';

import {
  handleDateChange,
  handleInputChange,
  handleSelectChange,
  handleStartPriceInput,
  handleTextareaChange,
} from '@/features/auction-add/model/handlers';
import { AuctionDateSelector } from '@/features/auction-add/ui/AuctionDateSelector';
import { AuctionImageUploader } from '@/features/auction-add/ui/AuctionImageUploader';
import { ErrorMessage } from '@/features/auction-add/ui/ErrorMessage';
import { ProductDescriptionInput } from '@/features/auction-add/ui/ProductDescriptionInput';

import { useAuctionAddForm } from '@/features/auction-add/model/useAuctionAddForm';
import { categories } from '@/shared/mock/auction';

const Page = () => {
  const {
    auctionName,
    setAuctionName,
    startPrice,
    setStartPrice,
    auctionCategory,
    setAuctionCategory,
    auctionDescription,
    setAuctionDescription,
    images,
    setImages,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fieldErrors,
    setFieldErrors,
    handleSubmit,
  } = useAuctionAddForm();

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
      {/*사진 등록 및 위치*/}
      <fieldset>
        <AuctionImageUploader images={images} setImages={setImages} />
        <ErrorMessage message={fieldErrors.images} />
        <LocationInfo address="서울시 강남구" />
      </fieldset>

      {/*경매 정보 입력*/}
      <fieldset>
        <Input
          label="경매 이름"
          value={auctionName}
          onChange={(e) => handleInputChange(e, setAuctionName, 'auctionName', setFieldErrors)}
        />
        <ErrorMessage message={fieldErrors.auctionName} />
      </fieldset>

      <fieldset>
        <Select
          label="경매 카테고리"
          value={auctionCategory}
          onChange={(e) =>
            handleSelectChange(e, setAuctionCategory, 'auctionCategory', setFieldErrors)
          }
          options={categories.map((c: { title: string }) => c.title)}
          id="auctionCategory"
        />
        <ErrorMessage message={fieldErrors.auctionCategory} />
      </fieldset>

      <fieldset>
        <Input
          label="경매 시작가"
          value={startPrice}
          onChange={(e) => handleStartPriceInput(e, setStartPrice, setFieldErrors)}
        />
        <ErrorMessage message={fieldErrors.startPrice} />
      </fieldset>

      {/* 날짜 선택 컴포넌트 */}
      <fieldset>
        <AuctionDateSelector
          startDate={startDate}
          endDate={endDate}
          setStartDate={(date) => handleDateChange(date, setStartDate, 'startDate', setFieldErrors)}
          setEndDate={(date) => handleDateChange(date, setEndDate, 'endDate', setFieldErrors)}
        />
        <ErrorMessage message={fieldErrors.startDate || fieldErrors.endDate} />
      </fieldset>

      {/* 상품 정보 입력 */}
      <fieldset>
        <ProductDescriptionInput
          value={auctionDescription}
          onChange={(e) =>
            handleTextareaChange(e, setAuctionDescription, 'auctionDescription', setFieldErrors)
          }
        />
        <ErrorMessage message={fieldErrors.auctionDescription} />
      </fieldset>

      <Button variants="primary" type="submit" size="thinLg">
        경매 등록
      </Button>
    </form>
  );
};

export default Page;
