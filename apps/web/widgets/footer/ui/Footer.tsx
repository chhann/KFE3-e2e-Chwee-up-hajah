import Link from 'next/link';
import { IconType } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { IoIosAddCircleOutline, IoMdHome } from 'react-icons/io';
import { IoChatboxEllipses } from 'react-icons/io5';
import { footerStyles as styles } from '../styles/footer.styles';
interface NavigationItem {
  label: string;
  href: string;
  icon: IconType;
}

export const Footer = () => {
  const items: NavigationItem[] = [
    { label: '홈', href: '/main', icon: IoMdHome },
    { label: '검색', href: '/auction/auction-list', icon: GoSearch },
    { label: '등록', href: '/auction/auction-add', icon: IoIosAddCircleOutline },
    { label: '대화', href: '/chat', icon: IoChatboxEllipses },
    { label: '프로필', href: '/profile', icon: FaUser },
  ];

  return (
    <footer className={styles.footer}>
      <ul className={styles.navList}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <Link href={item.href} className={styles.navLink}>
                <Icon className={styles.icon} />
                <span className={styles.label}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};
