'use client';

import { useState } from 'react';

// 이벤트 타입 정의
interface Event {
  id?: string;
  name: string;
  description: string;
  image_url: string;
  start_time: string;
  end_time: string;
  created_at?: string;
  updated_at?: string;
}

// 임시 데이터
const mockEvents: Event[] = [
  {
    id: '1',
    name: '여름 맞이 특별 이벤트!',
    description: '시원한 여름을 위한 특별한 혜택을 만나보세요.',
    image_url: 'https://via.placeholder.com/150',
    start_time: new Date().toISOString(),
    end_time: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function EventsClient() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    description: '',
    image_url: '',
    start_time: '',
    end_time: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase에 데이터 추가 로직 구현
    const newId = (events.length + 1).toString();
    const newEv: Event = {
      ...newEvent,
      id: newId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setEvents((prev) => [...prev, newEv]);
    // 폼 초기화
  };

  return (
    <div>
      {/* 이벤트 추가 폼 */}
      <form onSubmit={handleSubmit} className="mb-8 rounded-lg border p-4">
        <h2 className="mb-4 text-xl font-semibold">새 이벤트 추가</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={newEvent.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              설명
            </label>
            <textarea
              name="description"
              id="description"
              value={newEvent.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {/* ... 다른 필드들도 유사하게 추가 ... */}
        </div>
        <button type="submit" className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white">
          이벤트 추가
        </button>
      </form>

      {/* 이벤트 목록 */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">이벤트 목록</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="rounded-lg border p-4">
              <h3 className="font-bold">{event.name}</h3>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
