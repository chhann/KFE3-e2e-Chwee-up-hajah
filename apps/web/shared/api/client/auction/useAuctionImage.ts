import { useMutation } from '@tanstack/react-query';
import { postAuctionImages } from '../../server/auction/postAuctionImages';

export const useAuctionImage = () => {
  return useMutation<string, Error, File>({
    mutationFn: (img: File) => postAuctionImages(img),
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
