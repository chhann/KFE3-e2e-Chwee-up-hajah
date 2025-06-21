import Link from 'next/link';

export const Header = ({ onNotificationClick }: { onNotificationClick: () => void }) => {
  return (
    <header className="text-neutral-70 flex h-[68px] items-center justify-end gap-6 px-4 text-sm">
      <button
        type="button"
        onClick={onNotificationClick}
        className="m-0 cursor-pointer border-none bg-transparent p-0"
      >
        <h2>알림</h2>
      </button>
      <Link href="/">
        <h2>내 위치</h2>
      </Link>
    </header>
  );
};
