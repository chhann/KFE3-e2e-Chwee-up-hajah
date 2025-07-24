export interface PurchaseParams {
  hotdealId: string;
  purchasePrice: number;
  userId: string;
}

export const postPurchaseHotdeal = async ({ hotdealId, userId, purchasePrice }: PurchaseParams) => {
  const response = await fetch('/api/hotdeal/purchase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hotdealId, userId, purchasePrice }),
  });

  const data = await response.json();

  if (!response.ok) {
    // 서버에서 보낸 에러 메시지를 포함하여 에러를 throw합니다.
    throw new Error(data.error || 'An unexpected error occurred.');
  }

  return data;
};
