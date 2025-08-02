import { cn } from '@repo/ui/utils/cn';

import { MessageWithSender } from '@/shared/types/chat';

import { messageBubbleStyles } from '../styles/ChatMessages.styles';

type Props = {
  msg: MessageWithSender;
  time: string;
};

export const MyMessage = ({ msg, time }: Props) => {
  return (
    <div className="flex items-end gap-1">
      <div className="flex min-w-[32px] flex-col items-end text-[10px] leading-none">
        {!msg.is_read && <div className="--color-primary-500">1</div>}
        <div className="whitespace-nowrap text-[#484848]">{time}</div>
      </div>
      <div className={cn(messageBubbleStyles.base, messageBubbleStyles.mine)}>{msg.content}</div>
    </div>
  );
};
