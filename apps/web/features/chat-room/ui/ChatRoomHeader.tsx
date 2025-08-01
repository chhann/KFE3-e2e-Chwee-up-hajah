'use client';

import { useEffect, useState } from 'react';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { cn } from '@repo/ui/utils/cn';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

import { useHeaderStore } from '@/shared/stores/headerStore';
import { ChatRoomHeaderProps } from '@/shared/types/chat';

import { useChatRoomHeader } from '../hooks/useChatRoomHeader';
import { useConfirmTradeCompletion } from '../hooks/useConfirmTradeCompletion';
import { useRejectTradeCompletion } from '../hooks/useRejectTradeCompletion';
import { useRequestTradeCompletion } from '../hooks/useRequestTradeCompletion';
import { chatHeaderStyles } from '../styles/ChatRoomHeader.styles';

interface Props {
  roomId: string;
  currentUserId: string;
}

export const ChatRoomHeader = ({ roomId, currentUserId }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { setHeaderTitle } = useHeaderStore();
  const { data: room, isLoading, isError } = useChatRoomHeader(roomId);

  const { mutate: requestCompletion, isPending: isRequesting } = useRequestTradeCompletion(roomId);
  const { mutate: confirmCompletion, isPending: isConfirming } = useConfirmTradeCompletion(
    roomId,
    currentUserId
  );
  const { mutate: rejectCompletion, isPending: isRejecting } = useRejectTradeCompletion(roomId);

  useEffect(() => {
    if (room) {
      const opponentNickname =
        currentUserId === room.buyer_id ? room.seller_nickname : room.buyer_nickname;
      setHeaderTitle(opponentNickname);
    }
    return () => {
      setHeaderTitle(null);
    };
  }, [room, currentUserId, setHeaderTitle]);

  if (isLoading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  if (isError || !room) {
    return (
      <div className="p-4 text-center text-red-500">채팅방 정보를 불러오는 데 실패했습니다.</div>
    );
  }

  const isSeller = currentUserId === room.seller_id;
  const isBuyer = currentUserId === room.buyer_id;

  const canRequestCompletion = room.trade_status === 'ongoing' && isSeller;
  const needsBuyerConfirmation = room.trade_status === 'requested' && isBuyer;
  const isWaitingForConfirmation = room.trade_status === 'requested' && isSeller;

  const getBadgeStyle = (status: ChatRoomHeaderProps['trade_status']) => {
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

  const getStatusText = (status: ChatRoomHeaderProps['trade_status']) => {
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
          <div className="flex w-full items-center justify-between">
            <p className={chatHeaderStyles.productName}>{room.product_name}</p>
            <span className={`${chatHeaderStyles.statusBadge} ${getBadgeStyle(room.trade_status)}`}>
              {getStatusText(room.trade_status)}
            </span>
          </div>
          <div className={chatHeaderStyles.bidSection}>
            <p className={chatHeaderStyles.bidAmount}>
              낙찰가 {room.winning_bid_price?.toLocaleString()}원
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                'ml-auto self-start p-2',
                room.trade_status === 'ongoing' && isBuyer && 'invisible'
              )}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* 하단 거래 상태 (접고 펴기) */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div>
          {/* 판매자: 거래 완료 요청 버튼 */}
          {canRequestCompletion && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <p className="mb-2 text-center text-sm text-blue-800">
                거래가 완료되었나요? 구매자에게 완료 동의를 요청하세요.
              </p>
              <Button
                onClick={() => requestCompletion()}
                disabled={isRequesting}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                size="sm"
              >
                {isRequesting ? '요청 중...' : '거래 완료 동의 요청'}
              </Button>
            </div>
          )}

          {/* 판매자: 구매자 동의 대기 */}
          {isWaitingForConfirmation && (
            <div className="rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-600">
              <p>구매자의 거래 완료 동의를 기다리는 중입니다.</p>
            </div>
          )}

          {/* 구매자: 거래 완료 동의/거절 */}
          {needsBuyerConfirmation && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
              <p className="mb-3 text-center text-sm text-yellow-800">
                판매자가 거래 완료 동의를 요청했습니다. 동의하시겠습니까?
              </p>
              <div className="flex justify-center gap-2">
                <Button
                  onClick={() => confirmCompletion()}
                  disabled={isConfirming || isRejecting}
                  className="flex-1 bg-green-600 text-white hover:bg-green-700"
                  size="sm"
                >
                  {isConfirming ? '동의 중...' : '예'}
                </Button>
                <Button
                  onClick={() => rejectCompletion()}
                  disabled={isConfirming || isRejecting}
                  className="flex-1 bg-red-600 text-white hover:bg-red-700"
                  size="sm"
                >
                  {isRejecting ? '거절 중...' : '아니오'}
                </Button>
              </div>
            </div>
          )}

          {/* 거래 완료 */}
          {room.trade_status === 'completed' && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm font-semibold text-green-800">
                  거래가 성공적으로 완료되었습니다! 🎉
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
