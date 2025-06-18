import Link from 'next/link';
import { IoChevronForward } from 'react-icons/io5';

import { NavigationItem } from '../types';

interface NavigationProps {
  title: string;
  items: NavigationItem[];
}

export const Navigation = ({ title, items }: NavigationProps) => {
  return (
    <nav
      className="rounded-[6px] bg-[var(--color-primary-50)] px-[14px] py-[18px]"
      aria-label={title}
    >
      <ul className="text-sm">
        {items.map((item, index) => (
          <li key={item.href}>
            <Link href={item.href} className="text-neutral-30 flex items-center justify-between">
              <span>{item.label}</span>
              <IoChevronForward className="size-6" aria-hidden="true" />
            </Link>
            {index < items.length - 1 && <hr className="my-4 border-white" aria-hidden="true" />}
          </li>
        ))}
      </ul>
    </nav>
  );
};
