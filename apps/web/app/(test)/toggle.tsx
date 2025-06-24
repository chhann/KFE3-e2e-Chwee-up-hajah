'use client';

import { useEffect, useState } from 'react';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false); // hydration-safe 처리

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const cookieTheme = document.cookie.includes('theme=dark');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;

    // localStorage > cookie > system 순
    const finalTheme =
      storedTheme === 'dark'
        ? true
        : storedTheme === 'light'
          ? false
          : cookieTheme
            ? true
            : prefersDark;

    setIsDark(finalTheme);
    setMounted(true); // 렌더링 시작
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.cookie = `theme=dark; path=/; max-age=31536000`;
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.cookie = `theme=light; path=/; max-age=31536000`;
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  if (!mounted) return null; // 서버와 불일치 방지

  return (
    <button className="rounded-lg border px-4 py-2 text-sm" onClick={toggleTheme}>
      {isDark ? '라이트 모드' : '다크 모드'}
    </button>
  );
}
