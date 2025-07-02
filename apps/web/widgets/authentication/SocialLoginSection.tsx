// apps/web/widgets/authentication/SocialLoginSection.tsx
'use client';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import React from 'react';

interface SocialLoginSectionProps {
  onSocialLoginClick: () => void;
}

export const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({ onSocialLoginClick }) => (
  <div className="mt-4 text-center">
    <div className="text-center text-gray-500">다른 계정으로 로그인</div>
    <div className="mt-4 flex items-center justify-center space-x-3">
      {['구글', '애플', '페이스북'].map((platform) => (
        <Avatar
          key={platform}
          alt={platform}
          name={platform}
          size="sm"
          className="inline-block align-middle"
          onClick={onSocialLoginClick}
          src={`/images/avatar.png`}
          style={{ marginLeft: '8px', cursor: 'pointer' }}
        />
      ))}
    </div>
  </div>
);
