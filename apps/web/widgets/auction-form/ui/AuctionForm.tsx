import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { Select } from '@repo/ui/design-system/base-components/Select/index';

import {
  handleDateChange,
  handleInputChange,
  handlePriceInput,
  handleSelectChange,
  handleStartPriceInput,
  handleTextareaChange,
} from '@/features/auction-add/model/handlers';
import { useAuctionForm } from '@/features/auction-add/model/useAuctionForm';
import { AuctionDateSelector } from '@/features/auction-add/ui/AuctionDateSelector';
import { AuctionImageUploader } from '@/features/auction-add/ui/AuctionImageUploader';
import { ErrorMessage } from '@/features/auction-add/ui/ErrorMessage';
import { ProductDescriptionInput } from '@/features/auction-add/ui/ProductDescriptionInput';

import { useAuctionDetail } from '@/shared/api/client/auction/useAuctionDetail';
import { useAuctionImage } from '@/shared/api/client/auction/useAuctionImage';
import { categories } from '@/shared/mock/auction';

import { auctionFormStyle } from './styles/AuctionForm.styles';

type AuctionFormProps =
  | { isEdit: true; auctionId: string }
  | { isEdit?: false; auctionId?: undefined };
export const AuctionForm = ({ isEdit, auctionId }: AuctionFormProps) => {
  const { data: auctionData, isLoading } = useAuctionDetail(isEdit ? auctionId : null);
  const imageMutation = useAuctionImage();

  const {
    auctionName,
    setAuctionName,
    startPrice,
    setStartPrice,
    bidUnitPrice,
    setBidUnitPrice,
    auctionCategory,
    setAuctionCategory,
    auctionDescription,
    setAuctionDescription,
    files,
    setFiles,
    images,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fieldErrors,
    setFieldErrors,
    handleSubmit,
  } = useAuctionForm({
    isEdit: isEdit,
    initialData: isEdit ? auctionData : null,
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let uploadedImageUrls: string[] = [];
    if (files.length > 0) {
      const uploadPromises = files.map((file) => imageMutation.mutateAsync(file));
      const results = await Promise.all(uploadPromises);
      uploadedImageUrls = results.filter((url): url is string => !!url);
    }

    const finalImages = [...images, ...uploadedImageUrls];

    handleSubmit(e, finalImages);
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  return (
    <form onSubmit={handleFormSubmit} className={auctionFormStyle.formContainer}>
      <fieldset>
        <AuctionImageUploader files={files} setFiles={setFiles} />
        <ErrorMessage message={fieldErrors.images} />
      </fieldset>

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
          onChange={(e) =>
            handleStartPriceInput(
              e,
              setStartPrice,
              setFieldErrors,
              isEdit ? auctionData?.current_price : undefined,
              isEdit ? auctionData?.bid_count : undefined
            )
          }
        />
        <ErrorMessage message={fieldErrors.startPrice} />
      </fieldset>
      <fieldset>
        <Input
          label="경매 입찰 단가"
          value={bidUnitPrice}
          onChange={(e) => handlePriceInput(e, setBidUnitPrice, 'bidUnitPrice', setFieldErrors)}
        />
        <ErrorMessage message={fieldErrors.bidUnitPrice} />
      </fieldset>

      <fieldset>
        <AuctionDateSelector
          startDate={startDate}
          endDate={endDate}
          setStartDate={(date) => handleDateChange(date, setStartDate, 'startDate', setFieldErrors)}
          setEndDate={(date) => handleDateChange(date, setEndDate, 'endDate', setFieldErrors)}
        />
        <ErrorMessage message={fieldErrors.startDate || fieldErrors.endDate} />
      </fieldset>

      <fieldset>
        <ProductDescriptionInput
          value={auctionDescription}
          onChange={(e) =>
            handleTextareaChange(e, setAuctionDescription, 'auctionDescription', setFieldErrors)
          }
        />
        <ErrorMessage message={fieldErrors.auctionDescription} />
      </fieldset>

      <Button variants="primary" type="submit" size="thinLg" disabled={imageMutation.isPending}>
        {isEdit ? '수정 하기' : '경매 등록'}
      </Button>
    </form>
  );
};
