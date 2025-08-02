import { NotificationItem } from '@/shared/types/notification';

export const fetchNotificationList = async (): Promise<NotificationItem[]> => {
  try {
    const response = await fetch('/api/notification/list');

    if (!response.ok) {
      throw new Error(
        `Failed to fetch notification list:${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('[fetchNotificationList] Error:', error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Unknown error occurred while fetching notification list');
  }
};
