'use client';

import { Suspense } from 'react';
import { VerifyOtpForm } from '@/widgets/authentication/VerifyOtpForm';

function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}

export default VerifyOtpPage;
