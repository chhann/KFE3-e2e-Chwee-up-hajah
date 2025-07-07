import { CreateAuctionPayload } from '@/shared/types/auction';

export const postAuctionAdd = (payload: CreateAuctionPayload) =>
  fetch('/api/auction/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
