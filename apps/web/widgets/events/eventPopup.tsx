'use client';

import { useEffect, useState } from 'react';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { getToday } from '@repo/ui/utils/getToday';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { useEventPopupStore } from '@/shared/stores/eventPopupStore';

interface EventPopupData {
  id: number;
  title: string;
  redirect_url: string;
  image_url: string;
}

const fetchEventPopup = async (): Promise<EventPopupData | null> => {
  const response = await fetch('/api/events/popup/client');
  if (!response.ok) {
    throw new Error('Network 응답 요청 실패');
  }
  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text);
};

export const EventPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPopupVisible, setHideUntil } = useEventPopupStore();

  const today = getToday();
  const shouldFetch = isPopupVisible(today);

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery<EventPopupData | null>({
    queryKey: ['eventPopup'],
    queryFn: fetchEventPopup,
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: shouldFetch,
  });

  useEffect(() => {
    if (shouldFetch && event) {
      setIsOpen(true);
    }
  }, [event, shouldFetch]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDontShowToday = () => {
    setHideUntil(getToday());
    setIsOpen(false);
  };

  if (isLoading || isError || !event || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60">
      <div className="w-full max-w-sm overflow-hidden rounded-t-lg bg-white shadow-lg">
        <div className="p-4">
          <Link href={event.redirect_url} target="_blank" rel="noopener noreferrer">
            <Image
              src={event.image_url}
              alt={''}
              width={400}
              height={400}
              className="rounded-t-lg"
            />
          </Link>
        </div>
        <div className="flex border-t border-gray-200 bg-gray-50">
          <Button
            variants="custom"
            onClick={handleDontShowToday}
            className="w-1/2 border-r border-gray-200 py-3 text-sm text-gray-600 hover:bg-gray-100"
          >
            오늘 하루 보지 않기
          </Button>
          <Button
            variants="custom"
            onClick={handleClose}
            className="w-1/2 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100"
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
};
