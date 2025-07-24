'use client';

import { Event } from '@/shared/types/events';
import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Input } from '@repo/ui/design-system/base-components/Input/index';
import { format } from 'date-fns';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EventPage() {
  // 이벤트 목록 상태
  const [events, setEvents] = useState<Event[]>([]);
  const [listIsLoading, setListIsLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  // 이벤트 등록 폼 상태
  const [imageUrl, setImageUrl] = useState('https://picsum.photos/300/200?random=2');
  const [redirectUrl, setRedirectUrl] = useState('http://localhost:3001/main');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // 이벤트 목록을 가져오는 함수
  const fetchEvents = async () => {
    setListIsLoading(true);
    setListError(null);
    try {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('이벤트 목록을 불러오는 데 실패했습니다.');
      }
      const data = await response.json();
      setEvents(data);
    } catch (err: any) {
      setListError(err.message);
    } finally {
      setListIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 이벤트 목록을 불러옵니다.
  useEffect(() => {
    fetchEvents();
  }, []);

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormIsLoading(true);
    setFormError(null);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
          redirectUrl,
          startTime,
          endTime,
          is_active: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '이벤트 등록에 실패했습니다.');
      }

      alert('이벤트 배너가 성공적으로 등록되었습니다.');
      // 등록 성공 후 목록을 새로고침합니다.
      fetchEvents();
    } catch (error: any) {
      setFormError(error.message);
      console.error('에러 발생: ', error);
    } finally {
      setFormIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* 이벤트 등록 폼 섹션 */}
      <div>
        <h1 className="mb-4 text-2xl font-bold">이벤트 배너 등록</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="image-url" className="block text-sm font-medium text-gray-700">
              배너 이미지 (URL)
            </label>
            <img
              src={imageUrl}
              alt="배너 미리보기"
              className="my-2 h-48 w-full rounded object-cover"
            />
            <Input
              label="이미지 URL"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">
              시작 시간
            </label>
            <input
              type="datetime-local"
              name="start_time"
              className="w-full rounded-md border p-2"
              value={format(new Date(startTime), "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => setStartTime(new Date(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">
              종료 시간
            </label>
            <input
              type="datetime-local"
              name="end_time"
              className="w-full rounded-md border p-2"
              value={format(new Date(endTime), "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => setEndTime(new Date(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="redirect-url" className="block text-sm font-medium text-gray-700">
              리디렉션 URL
            </label>
            <Input
              type="text"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <Button
            className="bg-primary-500 mt-4 text-white"
            type="submit"
            variants="primary"
            disabled={formIsLoading}
          >
            {formIsLoading ? '등록 중...' : '배너 등록'}
          </Button>

          {formError && <p className="mt-2 text-sm text-red-600">{formError}</p>}
        </form>
      </div>

      {/* 이벤트 목록 섹션 */}
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold">이벤트 목록</h1>
        {(() => {
          if (listIsLoading) {
            return <p>로딩 중...</p>;
          }
          if (listError) {
            return <p className="text-red-600">에러: {listError}</p>;
          }
          if (events.length === 0) {
            return <p>등록된 이벤트가 없습니다.</p>;
          }
          return (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="rounded-lg border p-4 shadow-sm">
                  <img
                    src={event.imageUrl}
                    alt="이벤트 배너"
                    className="mb-4 h-48 w-full rounded-t-lg object-cover"
                  />
                  <div className="p-2">
                    <p>
                      <strong>리디렉션 URL:</strong>{' '}
                      <a
                        href={event.redirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {event.redirectUrl}
                      </a>
                    </p>
                    <p>
                      <strong>시작 시간:</strong> {new Date(event.startTime).toLocaleString()}
                    </p>
                    <p>
                      <strong>종료 시간:</strong> {new Date(event.endTime).toLocaleString()}
                    </p>
                    <p>
                      <strong>활성 상태:</strong> {event.is_active ? '활성' : '비활성'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <Link href="/admin/events/popup" className="text-blue-500 hover:underline">
          팝업창 테스트 페이지로 이동
        </Link>
        <Link href="/admin" className="text-blue-500 hover:underline">
          관리자 홈으로 이동
        </Link>
      </div>
    </div>
  );
}
