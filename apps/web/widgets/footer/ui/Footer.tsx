'use client';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { cn } from '@repo/ui/utils/cn';
import { CirclePlus, Flame, House, LucideProps, MessageCircleMore, UserRound } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { footerStyles as styles } from '../styles/footer.styles';
interface NavigationItem {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}

export const Footer = () => {
  const path = usePathname();
  const router = useRouter();

  const items: NavigationItem[] = [
    { label: '홈', href: '/main', icon: House },
    { label: '핫딜', href: '/hotdeal', icon: Flame },
    { label: '등록', href: '/auction/auction-add', icon: CirclePlus },
    { label: '대화', href: '/chat', icon: MessageCircleMore },
    { label: '프로필', href: '/profile', icon: UserRound },
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
