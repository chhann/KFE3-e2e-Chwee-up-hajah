'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { Card } from '@repo/ui/design-system/base-components/Card/index';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Popup {
  id: number;
  image_url: string;
  redirect_url: string;
  is_active: boolean;
  priority: number;
  start_date: string;
  end_date: string;
}

export default function EventPopupPage() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);

  const [newPopupData, setNewPopupData] = useState({
    image_url: '',
    redirect_url: '',
    priority: 10,
    start_date: '',
    end_date: '',
    is_active: true,
  });

  useEffect(() => {
    const fetchAdminPopups = async () => {
      try {
        const response = await fetch('/api/events/popup/admin');
        const data = await response.json();
        setPopups(data);
      } catch (error) {
        console.error('Failed to fetch popups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminPopups();
  }, []);

  const handleToggleActive = async (popup: Popup) => {
    try {
      const payload = {
        id: popup.id,
        is_active: !popup.is_active,
      };

      const response = await fetch('/api/events/popup/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('업데이트에 실패했습니다.');
      }

      const updatedPopupFromServer = await response.json();
      setPopups(popups.map((p) => (p.id === popup.id ? updatedPopupFromServer : p)));
    } catch (error) {
      console.error('Failed to update popup:', error);
      alert('업데이트 중 오류가 발생했습니다.');
      return;
    }
  };

  const handleNewPopupChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewPopupData({
      ...newPopupData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCreatePopup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/events/popup/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPopupData,
          start_date: new Date(newPopupData.start_date).toISOString(),
          end_date: new Date(newPopupData.end_date).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('생성 실패');
      }

      const createdPopup = await response.json();
      setPopups([createdPopup, ...popups]);
      // 폼 초기화
      setNewPopupData({
        image_url: '',
        redirect_url: '',
        priority: 10,
        start_date: '',
        end_date: '',
        is_active: true,
      });
    } catch (error) {
      console.error(error);
      alert('생성 중 오류 발생');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">이벤트 팝업 관리</h1>

      {/* 2. 여기에 팝업 생성 폼(Form)을 추가하면 됩니다. */}
      <form onSubmit={handleCreatePopup} className="mb-8 rounded-lg border p-4">
        <h2 className="mb-2 text-xl">새 팝업 추가</h2>
        <div className="space-y-2">
          <input
            name="image_url"
            value={newPopupData.image_url}
            onChange={handleNewPopupChange}
            placeholder="이미지 URL"
            required
            className="w-full border p-1"
          />
          <input
            name="redirect_url"
            value={newPopupData.redirect_url}
            onChange={handleNewPopupChange}
            placeholder="리디렉션 URL"
            className="w-full border p-1"
          />
          <input
            type="number"
            name="priority"
            value={newPopupData.priority}
            onChange={handleNewPopupChange}
            placeholder="우선순위"
            required
            className="w-full border p-1"
          />
          <input
            type="datetime-local"
            name="start_date"
            value={newPopupData.start_date}
            onChange={handleNewPopupChange}
            required
            className="w-full border p-1"
          />
          <input
            type="datetime-local"
            name="end_date"
            value={newPopupData.end_date}
            onChange={handleNewPopupChange}
            required
            className="w-full border p-1"
          />
          <label>
            <input
              type="checkbox"
              name="is_active"
              checked={newPopupData.is_active}
              onChange={handleNewPopupChange}
            />{' '}
            활성화
          </label>
        </div>
        <Button
          type="submit"
          variants="primary"
          className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
        >
          추가하기
        </Button>
      </form>

      <div className="mb-8">{/* 팝업 생성 폼 컴포넌트 */}</div>

      <div className="space-y-4">
        {popups.map((popup) => (
          <div key={popup.id} className="rounded-lg border p-4">
            <Card
              imageSrc={popup.image_url}
              badgeVariant="best"
              title={`리디렉션 :${popup.redirect_url}`}
              locationName="위치"
              endTime={popup.end_date}
              startTime={popup.end_date}
            />

            <p>이미지: {popup.image_url}</p>
            <p>우선순위: {popup.priority}</p>
            <div className="mt-2 flex items-center space-x-4">
              <label>활성화 상태: </label>
              <Button
                variants="primary"
                className={
                  popup.is_active
                    ? 'mt-2 rounded bg-blue-500 px-4 py-2 text-white'
                    : 'bg-error-500 mt-2 rounded'
                }
                onClick={() => handleToggleActive(popup)}
              >
                {popup.is_active ? '활성' : '비활성'}
              </Button>
              {/* 여기에 수정, 삭제 버튼 등을 추가할 수 있습니다. */}
            </div>
          </div>
        ))}
      </div>
      <Link href="/admin/events">이벤트 관리 페이지로 이동</Link>
    </div>
  );
}
