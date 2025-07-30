'use client';
import { cn } from '@repo/ui/utils/cn';
import { usePathname, useRouter } from 'next/navigation';
import { IconType } from 'react-icons';
import { GoSearch } from 'react-icons/go';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoChatbubbleEllipsesOutline, IoHomeOutline } from 'react-icons/io5';
import { LuUserRound } from 'react-icons/lu';

import { footerStyles as styles } from '../styles/footer.styles';
interface NavigationItem {
  label: string;
  href: string;
  icon: IconType;
}

export const Footer = () => {
  const path = usePathname();
  const router = useRouter();

  const items: NavigationItem[] = [
    { label: '홈', href: '/main', icon: IoHomeOutline },
    { label: '핫딜', href: '/hotdeal', icon: GoSearch },
    { label: '등록', href: '/auction/auction-add', icon: IoIosAddCircleOutline },
    { label: '대화', href: '/chat', icon: IoChatbubbleEllipsesOutline },
    { label: '프로필', href: '/profile', icon: LuUserRound },
  ];

  return (
    <footer className={styles.footer}>
      <ul className={styles.navList}>
        {items.map((item) => {
          const Icon = item.icon;
          const isActiveLink = path === item.href || undefined;
          return (
            <li key={item.label}>
              <div
                onClick={() => router.push(item.href)}
                className={cn(styles.navLink, isActiveLink && styles.isActiveLink)}
              >
                <Icon className={styles.icon} />
                <span className={styles.label}>{item.label}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};
