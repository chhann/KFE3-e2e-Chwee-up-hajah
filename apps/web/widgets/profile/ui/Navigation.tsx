import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { NavigationItem } from '@/shared/types/profile';

import { navigationStyles as styles } from '../styles/navigation.styles';

interface NavigationProps {
  title: string;
  items: NavigationItem[];
}

export const Navigation = ({ title, items }: NavigationProps) => {
  return (
    <nav className={styles.nav} aria-label={title}>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.link}>
              <span className={styles.label}>{item.label}</span>
              <ChevronRight className={styles.chevronIcon} aria-hidden="true" />
            </Link>
            {index < items.length - 1 && <hr className={styles.divider} aria-hidden="true" />}
          </li>
        ))}
      </ul>
    </nav>
  );
};
