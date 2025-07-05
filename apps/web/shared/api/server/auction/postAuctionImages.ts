export const postAuctionImages = async (img: File) => {
  try {
    const formData = new FormData();
    formData.append('file', img);

    const res = await fetch('/api/auction/product-image', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || res.statusText);
    }

    const { url } = await res.json();
    return url;
  } catch (err) {
    throw new Error(
      '이미지 업로드 중 오류가 발생했습니다: ' + (err instanceof Error ? err.message : '')
    );
  }
};
