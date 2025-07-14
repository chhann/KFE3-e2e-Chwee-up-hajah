import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

export async function GET() {
  try {
    throw new Error('Server-side Sentry test error from API route');
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ message: 'Error captured by Sentry' }, { status: 500 });
  }
}
