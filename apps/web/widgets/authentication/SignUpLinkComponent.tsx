// apps/web/widgets/authentication/SignUpLinkComponent.tsx
'use client';

import Link from 'next/link';
import React from 'react';

export const SignUpLinkComponent = () => (
  <p className="mt-12 text-center">
    계정이 없으신가요?{' '}
    <Link href="/signup" className="text-gray-500 hover:underline">
      회원가입
    </Link>
  </p>
);
