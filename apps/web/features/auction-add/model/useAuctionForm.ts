import { useCreateAuction } from '@/shared/api/client/auction/useCreateAuction';
import { useUpdateAuction } from '@/shared/api/client/auction/useUpdateAuction';
import { formatDateString } from '@/shared/lib/utils/formatDateString';
import { auctionAddSchema } from '@/shared/lib/validators/auctionAddSchema';
import { useAuthStore } from '@/shared/stores/auth';
import { AuctionDetail } from '@/shared/types/db';
import { getToday } from '@repo/ui/utils/getToday';
import { useEffect, useState } from 'react';

export function useAuctionForm({
  isEdit = false,
  initialData = null,
}: {
  isEdit?: boolean;
  initialData?: AuctionDetail | null;
}) {
  const [auctionName, setAuctionName] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [auctionCategory, setAuctionCategory] = useState('');
  const [auctionDescription, setAuctionDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(getToday());
  const [endDate, setEndDate] = useState(getToday());

  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const createAuctionMutation = useCreateAuction();
  const updateAuctionMutation = useUpdateAuction();
  const sellerId = useAuthStore((state) => state.userId);

  useEffect(() => {
    if (isEdit && initialData) {
      setAuctionName(initialData.product?.name || '');
      setStartPrice(String(initialData.start_price) || '');
      setAuctionCategory(initialData.product?.category || '');
      setAuctionDescription(initialData.product?.description || '');
      setImages(initialData.images || []);
      setStartDate(formatDateString(initialData.start_time));
      setEndDate(formatDateString(initialData.end_time));
    }
  }, [isEdit, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const result = auctionAddSchema.safeParse({
      images,
      auctionName,
      auctionCategory,
      startPrice,
      auctionDescription,
      startDate,
      endDate,
    });

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0]] = err.message;
      });
      setFieldErrors(errors);
      setFormError(result.error.errors[0]?.message || '입력값을 확인해 주세요.');
      return;
    }

    let finalStartDate = startDate;
    let finalEndDate = endDate;

    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0];

    if (startDate.split('T')[0] === todayDateString) {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 10);

      finalStartDate = now.toISOString();

      const endDateObj = new Date(endDate);
      endDateObj.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
      finalEndDate = endDateObj.toISOString();
    }

    if (isEdit) {
      if (sellerId !== initialData?.seller_id) {
        return alert('본인이 등록한 경매만 수정할 수 있습니다.');
      }
      if (!initialData) {
        setFormError('수정할 경매 정보가 올바르지 않습니다.');
        return;
      }

      // 현재 폼의 수정 가능한 필드 값들을 객체로 구성
      const currentEditableValues = {
        auctionName: auctionName,
        startPrice: Number(startPrice),
        auctionCategory: auctionCategory,
        auctionDescription: auctionDescription,
        images: images,
        startDate: finalStartDate,
        endDate: finalEndDate,
      };

      // 초기 데이터에서 수정 가능한 필드 값들을 객체로 구성
      const initialEditableValues = {
        auctionName: initialData.product?.name || '',
        startPrice: initialData.start_price,
        auctionCategory: initialData.product?.category || '',
        auctionDescription: initialData.product?.description || '',
        images: initialData.images || [],
        startDate: formatDateString(initialData.start_time),
        endDate: formatDateString(initialData.end_time),
      };

      // JSON.stringify를 이용한 간단한 객체 내용 비교
      if (JSON.stringify(currentEditableValues) === JSON.stringify(initialEditableValues)) {
        alert('데이터를 수정해 주세요.');
        return; // 제출 방지
      }

      const completeAuctionData = {
        ...initialData,
        start_price: Number(startPrice),
        start_time: finalStartDate,
        end_time: finalEndDate,
        images: images,
        thumbnail: images[0] || '',
      };

      const updatePayload = {
        auctionId: initialData.auction_id,
        auctionData: completeAuctionData,
        productData: {
          name: auctionName,
          category: auctionCategory,
          description: auctionDescription,
        },
      };
      updateAuctionMutation.mutate(updatePayload);
    } else {
      const createPayload = {
        seller_id: sellerId,
        name: auctionName,
        category: auctionCategory,
        description: auctionDescription,
        start_price: Number(startPrice),
        start_time: finalStartDate,
        end_time: finalEndDate,
        thumbnail: images[0] || '',
        images,
      };
      createAuctionMutation.mutate(createPayload);
    }
  };

  const mutationStatus = isEdit ? updateAuctionMutation : createAuctionMutation;

  return {
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
    formError,
    fieldErrors,
    setFieldErrors,
    handleSubmit,
    isPending: mutationStatus.isPending,
    isSuccess: mutationStatus.isSuccess,
    error: mutationStatus.error,
  };
}
