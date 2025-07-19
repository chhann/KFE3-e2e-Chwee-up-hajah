'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa6';
import { ScrollButtonStyle } from './ScrollButton.styles';

const SCROLL_THRESHOLD = 0; // 사용자가 수정한 스크롤 감지 임계값 유지

export function ScrollButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const scrollContainer = document.getElementById('main-scroll-container');
    if (!scrollContainer) {
      return;
    }

    const toggleVisibility = () => {
      if (scrollContainer.scrollTop > SCROLL_THRESHOLD) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    scrollContainer.addEventListener('scroll', toggleVisibility);

    // 페이지 로드 시점에 이미 스크롤이 내려가 있는 경우를 위해 초기 체크 실행
    toggleVisibility();

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      scrollContainer.removeEventListener('scroll', toggleVisibility);
    };
  }, [isMounted]);

  const scrollToTop = () => {
    document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isChatRoom = pathname.startsWith('/chat/') && pathname.length > '/chat/'.length;
  const otherHiddenPaths = ['/profile'];
  const isHiddenPage = isChatRoom || otherHiddenPaths.some((path) => pathname.startsWith(path));

  if (!isMounted || isHiddenPage) {
    return null;
  }

  return (
    <div className={ScrollButtonStyle.container}>
      {isVisible && (
        <div onClick={scrollToTop} className={ScrollButtonStyle.button} aria-label="Go to top">
          <FaChevronUp />
        </div>
      )}
    </div>
  );
}
