'use client';

import { pageview } from '@/shared/lib/ga4/gtag';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    pageview(url);
  }, [pathname, searchParams]);

  return null;
}
