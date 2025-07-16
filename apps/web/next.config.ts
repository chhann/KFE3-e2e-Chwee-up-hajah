import withPWA from '@ducanh2912/next-pwa';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  transpilePackages: ['@sentry/nextjs'],
  productionBrowserSourceMaps: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const pwaOptions = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  swSrc: 'public/sw.js',
};

// withPWA를 먼저 적용하고, 그 결과에 nextConfig를 전달
const withPwaApplied = withPWA(pwaOptions)(nextConfig);

// withSentryConfig를 마지막으로 적용
const sentryConfig = withSentryConfig(
  withPwaApplied, // PWA가 적용된 nextConfig를 전달
  {
    // Sentry Webpack Plugin options
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  }
);

export default sentryConfig;
