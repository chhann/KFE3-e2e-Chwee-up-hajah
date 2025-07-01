import Link from 'next/link';
import { IconType } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { IoIosAddCircleOutline, IoMdHome } from 'react-icons/io';
import { IoChatboxEllipses } from 'react-icons/io5';

interface NavigationItem {
  label: string;
  href: string;
  icon: IconType;
}

export const Footer = () => {
  const items: NavigationItem[] = [
    { label: '홈', href: '/main', icon: IoMdHome },
    { label: '검색', href: '#', icon: GoSearch },
    { label: '등록', href: '/auction/auction-add', icon: IoIosAddCircleOutline },
    { label: '대화', href: '/chat', icon: IoChatboxEllipses },
    { label: '프로필', href: '/profile', icon: FaUser },
  ];

  return (
    <footer className="h-20">
      <ul className="text-neutral-70 flex size-full items-center justify-between px-6 py-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex flex-col items-center text-sm transition-colors hover:text-[var(--color-primary-500)]"
              >
                <Icon className="mb-[6px] size-6" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};
