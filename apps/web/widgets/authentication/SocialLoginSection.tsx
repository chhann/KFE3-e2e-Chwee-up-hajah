// apps/web/widgets/authentication/SocialLoginSection.tsx
'use client';

import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import React from 'react';
import { SocialLoginSectionProps } from '../../../types/auth/login';
import { SocialLoginSectionStyles } from './styles';

export const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({ onSocialLoginClick }) => (
  <div className={SocialLoginSectionStyles.container}>
    <div className={SocialLoginSectionStyles.title}>다른 계정으로 로그인</div>
    <div className={SocialLoginSectionStyles.icons}>
      {['구글', '애플', '페이스북'].map((platform) => (
        <Avatar
          key={platform}
          alt={platform}
          name={platform}
          size="sm"
          className={SocialLoginSectionStyles.avatar}
          onClick={onSocialLoginClick}
          src={`/images/avatar.png`}
          style={SocialLoginSectionStyles.avatarStyle}
        />
      ))}
    </div>
  </div>
);
