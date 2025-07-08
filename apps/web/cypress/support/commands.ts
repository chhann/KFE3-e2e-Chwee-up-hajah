// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { useAuthStore } from '@/shared/stores/auth';

Cypress.Commands.add('login', (userId = 'test-user-id') => {
  const session = {
    user: {
      id: userId,
      aud: 'authenticated',
      role: 'authenticated',
      email: 'test@example.com',
    },
    expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    access_token: 'fake-access-token',
    refresh_token: 'fake-refresh-token',
    token_type: 'bearer',
  };

  // Supabase는 인증 정보를 쿠키에 저장합니다.
  // 쿠키 이름은 다를 수 있으므로, 실제 프로젝트의 쿠키를 확인하고 설정해야 합니다.
  cy.setCookie(`sb-test-session`, JSON.stringify(session));

  // Zustand 스토어의 userId와 isAuthenticated 상태를 직접 설정
  // useAuthStore는 훅이자 스토어 인스턴스이므로, setState를 직접 호출할 수 있습니다.
  useAuthStore.setState({ userId: userId, isAuthenticated: true });
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(userId?: string): Chainable<void>;
    }
  }
}

export {};
