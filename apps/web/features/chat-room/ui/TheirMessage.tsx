import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { cn } from '@repo/ui/utils/cn';

import { MessageWithSender } from '@/shared/types/chat';

import { messageBubbleStyles } from '../styles/ChatMessages.styles';

type Props = {
  msg: MessageWithSender;
  time: string;
  showAvatar: boolean;
};

export const TheirMessage = ({ msg, time, showAvatar }: Props) => {
  return (
    <div className="flex items-end gap-1">
      {showAvatar ? (
        <Avatar
          src={msg.sender_avatar ?? undefined}
          alt=""
          size="sm"
          name={msg.sender_name}
          className="mr-2"
        />
      ) : (
        <div className="h-8 w-8" /> // Avatar size is 'sm', which is h-8 w-8
      )}
      <div className="flex items-end gap-1">
        <div className={cn(messageBubbleStyles.base, messageBubbleStyles.theirs)}>
          {msg.content}
        </div>
        <div className="whitespace-nowrap text-[10px] text-[var(--text-tertiary)]">{time}</div>
      </div>
    </div>
  );
};
