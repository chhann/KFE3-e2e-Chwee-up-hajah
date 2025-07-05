import { useCreateAuction } from '@/hooks/useCreateAuction';
import { auctionAddSchema } from '@/shared/lib/validators/auctionAddSchema';
import { useAuthStore } from '@/shared/stores/auth';
import { getToday } from '@repo/ui/utils/getToday';
import { useState } from 'react';

export function useAuctionAddForm() {
  const [auctionName, setAuctionName] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [auctionCategory, setAuctionCategory] = useState('');
  const [auctionDescription, setAuctionDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>(getToday());
  const [endDate, setEndDate] = useState<string>(getToday());
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const createAuctionMutation = useCreateAuction();
  const sellerId = useAuthStore((state) => state.userId);

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
    const payload = {
      seller_id: sellerId,
      name: auctionName,
      category: auctionCategory,
      description: auctionDescription,
      start_price: Number(startPrice),
      start_time: startDate,
      end_time: endDate,
      thumbnail: images[0] || '',
      images,
    };
    createAuctionMutation.mutate(payload);
  };

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
    setFormError,
    fieldErrors,
    setFieldErrors,
    handleSubmit,
  };
}
