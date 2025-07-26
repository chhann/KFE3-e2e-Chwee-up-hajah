import * as Sentry from '@sentry/nextjs';

// production(배포 환경) 에서만 Sentry에 오류를 전송
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    // replaysSessionSampleRate: 0.1,
    // replaysOnErrorSampleRate: 1.0,
    // integrations:
    //   typeof window !== 'undefined'
    //     ? [
    //         Sentry.replayIntegration({
    //           maskAllText: true,
    //           blockAllMedia: true,
    //         }),
    //       ]
    //     : [],
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
