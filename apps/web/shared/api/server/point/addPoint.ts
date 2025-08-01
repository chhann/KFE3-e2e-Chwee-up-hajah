export const addPoint = async (userId: string) => {
  const response = await fetch('/api/point/add-test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error('포인트 적립 실패');
  }

  return data;
};
