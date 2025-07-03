// apps/web/widgets/authentication/SignUpLinkComponent.tsx
'use client';

import Link from 'next/link';
import React from 'react';
import { SignUpLinkComponentStyles } from './styles';

export const SignUpLinkComponent = () => (
  <p className={SignUpLinkComponentStyles.container}>
    계정이 없으신가요?{' '}
    <Link href="/signup" className={SignUpLinkComponentStyles.link}>
      회원가입
    </Link>
  </p>
);
