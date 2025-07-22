import * as Sentry from '@sentry/nextjs';

export function register() {
  // 개발 환경에서는 초기화 하지 않음
  if (process.env.NODE_ENV !== 'production') return;

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
    });
  }
}

// 이건 그대로 유지 가능 (Sentry가 init 된 경우에만 작동)
export const onRequestError = Sentry.captureRequestError;
