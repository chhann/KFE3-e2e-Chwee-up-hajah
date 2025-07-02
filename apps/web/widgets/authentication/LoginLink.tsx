'use client';

import Link from 'next/link';
import React from 'react';
import { SignupFormComponentStyles } from './styles';

export const LoginLink = () => (
  <p className={SignupFormComponentStyles.loginLinkContainer}>
    계정이 있으신가요?{' '}
    <Link href="/login" className={SignupFormComponentStyles.loginLink}>
      로그인
    </Link>
  </p>
);
