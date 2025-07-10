'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function SentryTestPage() {
  useEffect(() => {
    // This error will be captured by Sentry on the client-side
    try {
      throw new Error('Client-side Sentry test error from (test) route group');
    } catch (error) {
      Sentry.captureException(error);
    }
  }, []);

  const throwServerError = async () => {
    // This will trigger a server-side error that Sentry should capture
    await fetch('/api/sentry-test-error');
  };

  return (
    <div>
      <h1>Sentry Test Page</h1>
      <p>Check your Sentry dashboard for errors after visiting this page.</p>
      <button onClick={throwServerError}>Throw Server Error</button>
    </div>
  );
}
