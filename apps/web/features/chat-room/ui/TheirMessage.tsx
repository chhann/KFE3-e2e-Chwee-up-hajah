import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { cn } from '@repo/ui/utils/cn';
import { messageBubbleStyles } from '../styles/ChatMessages.styles';
import { MessageWithSender } from '@/shared/types/chat';

type Props = {
  msg: MessageWithSender;
  time: string;
};

export const TheirMessage = ({ msg, time }: Props) => {
  return (
    <div className="flex items-end gap-1">
      <Avatar
        src={msg.sender_avatar ?? undefined}
        alt=""
        size="sm"
        name={msg.sender_name}
        className="mr-2"
      />
      <div className="flex items-end gap-1">
        <div className={cn(messageBubbleStyles.base, messageBubbleStyles.theirs)}>
          {msg.content}
        </div>
        <div className="whitespace-nowrap text-[10px] text-[var(--text-tertiary)]">{time}</div>
      </div>
    </div>
  );
};
