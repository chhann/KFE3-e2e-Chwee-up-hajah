'use client';

import { useEffect } from 'react';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

import { useHeaderStore } from '@/shared/stores/headerStore';
import { ChatRoom } from '@/shared/types/chat';

import { chatHeaderStyles } from '../styles/ChatRoomHeader.styles';

interface Props {
  room: ChatRoom;
  currentUserId: string;
  // TODO: 실제 API 호출 함수를 prop으로 받아야 합니다.
  onRequestCompletion: () => void;
}

export const ChatRoomHeader = ({ room, currentUserId, onRequestCompletion }: Props) => {
  const { setHeaderTitle } = useHeaderStore();

  const opponentNickname =
    currentUserId === room.buyer_id ? room.seller_nickname : room.buyer_nickname;
  // TODO: 실제 비즈니스 로직에 따라 수정해야 합니다. (예: 구매자만 요청 가능)
  const canRequestCompletion = room.trade_status === 'ongoing' && currentUserId === room.buyer_id;

  useEffect(() => {
    setHeaderTitle(opponentNickname);
    return () => {
      setHeaderTitle(null);
    };
  }, [opponentNickname, setHeaderTitle]);

  const getBadgeStyle = (status: ChatRoom['trade_status']) => {
    switch (status) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'requested':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: ChatRoom['trade_status']) => {
    switch (status) {
      case 'ongoing':
        return '거래중';
      case 'requested':
        return '동의요청';
      case 'completed':
        return '거래완료';
      default:
        return '상태없음';
    }
  };

  return (
    <div className={chatHeaderStyles.container}>
      {/* 상단 상품 정보 */}
      <div className={chatHeaderStyles.topSection}>
        <Image
          src={room.thumbnail || ''}
          alt={room.product_name}
          width={56}
          height={56}
          className={chatHeaderStyles.thumbnail}
        />
        <div className={chatHeaderStyles.productDetails}>
          <p className={chatHeaderStyles.productName}>{room.product_name}</p>
          <div className={chatHeaderStyles.bidSection}>
            <p className={chatHeaderStyles.bidAmount}>
              낙찰가 {room.winning_bid_price?.toLocaleString()}원
            </p>
            <span className={`${chatHeaderStyles.statusBadge} ${getBadgeStyle(room.trade_status)}`}>
              {getStatusText(room.trade_status)}
            </span>
          </div>
        </div>
      </div>

      {/* 하단 거래 상태 */}
      <div className={chatHeaderStyles.transactionSection}>
        {room.trade_status === 'ongoing' && canRequestCompletion && (
          <div className="space-y-2">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <div className="flex-1">
                  <p className="mb-2 text-sm text-blue-800">
                    거래가 완료되었나요? 상대방에게 거래 완료 동의를 요청할 수 있습니다.
                  </p>
                  <Button
                    onClick={onRequestCompletion}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    size="sm"
                  >
                    거래 완료 동의 요청
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {room.trade_status === 'requested' && (
          <div className="rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-600">
            <p>상대방의 동의를 기다리는 중입니다.</p>
          </div>
        )}

        {room.trade_status === 'completed' && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-sm text-green-800">거래가 성공적으로 완료되었습니다! 🎉</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
