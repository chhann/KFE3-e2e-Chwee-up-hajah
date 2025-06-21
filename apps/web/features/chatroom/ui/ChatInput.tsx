'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabase/supabase';

export const ChatInput = ({ roomId, senderId }: { roomId: string; senderId: string }) => {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!message.trim()) return;

    const now = new Date().toISOString();

    const { error } = await supabase.from('message').insert({
      room_id: roomId,
      sender_id: senderId,
      content: message,
      sent_at: now,           // 🕒 전송 시간
      is_read: false,       // 👁️ 초기 상태
    });

    if (error) {
      console.error('메시지 전송 실패:', error);
    } else {
      setMessage('');
    }
  };

  return (
    <div className="flex gap-2 p-2">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 rounded border px-3 py-2"
        placeholder="메시지를 입력하세요"
      />
      <button onClick={handleSend} className="rounded bg-blue-500 px-4 py-2 text-white">
        전송
      </button>
    </div>
  );
};
