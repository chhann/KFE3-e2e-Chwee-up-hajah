import { useQuery } from '@tanstack/react-query';
import { fetchNotificationList } from '../../server/notification/fetchNotificationList';

export const useNotificationList = (isModalOpen: boolean) => {
  return useQuery({
    queryKey: ['notification', 'list'],
    queryFn: fetchNotificationList,
    enabled: isModalOpen,
  });
};
