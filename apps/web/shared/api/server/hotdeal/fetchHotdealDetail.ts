export const fetchHotdealDetail = async (hotdealId: string) => {
  try {
    const res = await fetch(`/api/hotdeal/${hotdealId}/detail`);
    const json = await res.json();

    if (!json?.data) {
      throw new Error('No hotdeal data found');
    }

    if (!res.ok) {
      throw new Error(json?.error || 'Failed to fetch hotdeal detail');
    }

    return json.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err; // 이미 Error 객체인 경우 그대로 던짐
    }

    // 그 외의 경우는 강제로 Error로 감싸서 던짐
    throw new Error(
      typeof err === 'string' ? err : 'Unknown error occurred while fetching hotdeal detail'
    );
  }
};
