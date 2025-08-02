import { useEffect, useState } from 'react';

import { getToday } from '@repo/ui/utils/getToday';
import toast from 'react-hot-toast';

import { useCreateAuction } from '@/shared/api/client/auction/useCreateAuction';
import { useUpdateAuction } from '@/shared/api/client/auction/useUpdateAuction';
import { formatDateString } from '@/shared/lib/utils/formatDateString';
import { isAuctionStarted } from '@/shared/lib/utils/isAuctionStarted';
import { auctionAddSchema } from '@/shared/lib/validators/auctionAddSchema';
import { useAuthStore } from '@/shared/stores/auth';
import { useModalStore } from '@/shared/stores/modal';
import { AuctionDetail } from '@/shared/types/db';

export function useAuctionForm({
  isEdit = false,
  initialData = null,
}: {
  isEdit?: boolean;
  initialData?: AuctionDetail | null;
}) {
  const [auctionName, setAuctionName] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [bidUnitPrice, setBidUnitPrice] = useState('1000');
  const [auctionCategory, setAuctionCategory] = useState('');
  const [auctionDescription, setAuctionDescription] = useState('');
  const [images, setImages] = useState<string[]>([]); // For existing image URLs on edit
  const [files, setFiles] = useState<File[]>([]); // For new image files
  const [startDate, setStartDate] = useState(getToday());
  const [endDate, setEndDate] = useState(getToday());
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { setOpenModal } = useModalStore();

  const createAuctionMutation = useCreateAuction();
  const updateAuctionMutation = useUpdateAuction();
  const sellerId = useAuthStore((state) => state.userId);

  const isStarted = (() => {
    if (!initialData || !initialData.start_time) {
      return false;
    }
    if (initialData.status === 'closed' && initialData.bid_count === 0) {
      return false;
    }
    return isAuctionStarted(initialData.start_time);
  })();

  useEffect(() => {
    if (isEdit && initialData) {
      setAuctionName(initialData.product?.name || '');
      setStartPrice(String(initialData.start_price) || '');
      setAuctionCategory(initialData.product?.category || '');
      setAuctionDescription(initialData.product?.description || '');
      setImages(initialData.images || []); // Keep existing images
      setBidUnitPrice(String(initialData.bid_unit_price) || '1000');
      setStartDate(formatDateString(initialData.start_time));
      setEndDate(formatDateString(initialData.end_time));
    }
  }, [isEdit, initialData]);

  const handleSubmit = async (e: React.FormEvent, finalImages: string[]) => {
    e.preventDefault();

    if (isEdit && isStarted) {
      toast.error('경매가 시작되어 수정이 불가능합니다.');
      return;
    }

    const dialogTitle = isEdit ? '경매 수정 확인' : '경매 등록 확인';
    const dialogDescription = isEdit
      ? '경매 시작 이후로는 수정 및 삭제가 불가능하며\n당일 시작일 경우 10분의 유예시간이 주어집니다.\n경매를 수정하시겠습니까?'
      : '경매 시작 이후로는 수정 및 삭제가 불가능하며\n당일 시작일 경우 10분의 유예시간이 주어집니다.\n경매를 등록하시겠습니까?';
    const dialogConfirmText = isEdit ? '수정' : '등록';

    setOpenModal('confirm', {
      title: dialogTitle,
      description: dialogDescription,
      confirmText: dialogConfirmText,
      cancelText: '취소',
      onConfirm: async () => {
        setFormError(null);
        setFieldErrors({});

        const result = auctionAddSchema.safeParse({
          images: finalImages, // Validate with the final list of URLs
          auctionName,
          auctionCategory,
          startPrice,
          bidUnitPrice,
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
            return toast('본인이 등록한 경매만 수정할 수 있습니다.');
          }
          if (!initialData) {
            setFormError('수정할 경매 정보가 올바르지 않습니다.');
            return;
          }

          const currentEditableValues = {
            auctionName: auctionName,
            startPrice: Number(startPrice),
            bidUnitPrice: Number(bidUnitPrice),
            auctionCategory: auctionCategory,
            auctionDescription: auctionDescription,
            images: finalImages,
            startDate: finalStartDate,
            endDate: finalEndDate,
          };

          const initialEditableValues = {
            auctionName: initialData.product?.name || '',
            startPrice: initialData.start_price,
            bidUnitPrice: initialData.bid_unit_price,
            auctionCategory: initialData.product?.category || '',
            auctionDescription: initialData.product?.description || '',
            images: initialData.images || [],
            startDate: formatDateString(initialData.start_time),
            endDate: formatDateString(initialData.end_time),
          };

          if (JSON.stringify(currentEditableValues) === JSON.stringify(initialEditableValues)) {
            toast('데이터를 수정해 주세요.');
            return;
          }

          const completeAuctionData = {
            ...initialData,
            start_price: Number(startPrice),
            current_price:
              initialData.bid_count === 0 ? Number(startPrice) : initialData.current_price,
            bid_unit_price: Number(bidUnitPrice),
            start_time: finalStartDate,
            end_time: finalEndDate,
            images: finalImages,
            thumbnail: finalImages[0] || '',
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
            bid_unit_price: Number(bidUnitPrice),
            start_time: finalStartDate,
            end_time: finalEndDate,
            thumbnail: finalImages[0] || '',
            images: finalImages,
          };
          createAuctionMutation.mutate(createPayload);
        }
      },
    });
  };

  const mutationStatus = isEdit ? updateAuctionMutation : createAuctionMutation;

  return {
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
    images,
    setImages,
    files,
    setFiles,
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
