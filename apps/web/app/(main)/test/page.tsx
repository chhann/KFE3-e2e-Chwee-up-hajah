'use client';

import { supabase } from '../../../lib/supabase/supabase';

// 낙찰이 되어서 buyer과 seller 의 각각의 유저 id의 정보로 chat rooms 테이블 생성
const test = () => {
  const createChatRoom = async () => {
    const { data, error } = await supabase
      .from('chatroom')
      .insert({
        product_id: '3649bdad-be60-4114-8a52-461a977f492c', // 맥북 프로로 예시
        product_name: '멕북 프로',
        seller_id: '9a21a88a-94f1-4a4b-b0f6-aaa111111111', // ✅ 예시 유저 철수
        seller_nickname: '철수',
        buyer_id: 'be5cf2a9-63d5-4a89-afd0-86d304fe4154', // ✅ 예시 유저 영희
        buyer_nickname: '영희',
        is_push_on: false
      })
      .select('room_id')
      .single();

    if (error) {
      console.error('❌ 채팅방 생성 실패:', error.message);
    } else {
      console.log('✅ 채팅방 생성 완료! ID:', data.room_id);
    }
  };
  return (
    <main className="p-6">
      <h1 className="mb-4 text-xl font-bold">채팅방 생성 테스트</h1>
      <button
        onClick={createChatRoom}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        테스트용 채팅방 생성
      </button>
    </main>
  );
};

export default test;
