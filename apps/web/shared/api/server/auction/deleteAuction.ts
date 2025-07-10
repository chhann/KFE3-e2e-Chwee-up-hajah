export const deleteAuction = async (auctionId: string) => {
  const response = await fetch(`/api/auction/delete/${auctionId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '경매 삭제를 실패했습니다.');
  }

  return response.json();
};
