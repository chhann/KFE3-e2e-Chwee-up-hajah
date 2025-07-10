import { UpdateAuctionParams } from '@/shared/types/auction';

export const updateAuction = async ({
  auctionId,
  auctionData,
  productData,
}: UpdateAuctionParams) => {
  const response = await fetch(`/api/auction/put/${auctionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      auction_id: auctionId,
      auction_data: auctionData,
      product_data: productData,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '경매 정보 업데이트에 실패했습니다.');
  }

  return response.json();
};
