export const fetchPointsHistory = async () => {
  try {
    const response = await fetch('/api/point/history');

    if (!response.ok) {
      throw new Error(
        `Failed to fetch notification list:${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('[fetchPointsHistory] Error:', error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Unknown error occurred while fetching points history');
  }
};
