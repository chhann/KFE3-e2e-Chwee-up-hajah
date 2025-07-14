'use client';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import Link from 'next/link';

function SignupCompletePage() {
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center', padding: '40px 0' }}>
      <h2>회원가입 완료!</h2>
      <p style={{ margin: '20px 0' }}>환영합니다! 이제 모든 서비스를 이용하실 수 있습니다.</p>
      <Link href="/main" passHref>
        <Button variants="primary">메인 페이지로 이동</Button>
      </Link>
    </div>
  );
}

export default SignupCompletePage;
