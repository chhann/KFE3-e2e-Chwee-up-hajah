import Link from 'next/link';

export const Header = () => {
  return (
    <header className="text-neutral-70 flex h-[68px] items-center justify-end gap-6 px-4 text-sm">
      <Link href="/">
        <h2>알림</h2>
      </Link>
      <Link href="/">
        <h2>내 위치</h2>
      </Link>
    </header>
  );
};
