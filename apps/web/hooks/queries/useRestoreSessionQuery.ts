import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth';

async function fetchSession() {
  const response = await fetch('/api/auth/session');
  if (!response.ok) {
    throw new Error('Failed to fetch session');
  }
  const data = await response.json();
  return data;
}

export const useRestoreSessionQuery = () => {
  const { setSession } = useAuthStore();

  return useQuery({
    queryKey: ['user', 'session'],
    queryFn: fetchSession,
    onSuccess: (data) => {
      if (data && data.userId) {
        setSession(data.userId);
      } else {
        setSession(null);
      }
    },
    onError: () => {
      setSession(null);
    },
    retry: false, // Optional: prevent retrying on failed session fetch
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
