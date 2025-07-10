'use client';

import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';

export default function GlobalError({ error }: { error: Error }) {
  Sentry.captureException(error);

  return (
    <html>
      <body>
        {/* This is the default Next.js error page but you can customize it to your needs. */}
        <NextError statusCode={undefined} />
      </body>
    </html>
  );
}
