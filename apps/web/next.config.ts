import withPWA from '@ducanh2912/next-pwa';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // picsum.photos 도메인의 모든 경로 허용
      },
      {
        protocol: 'https',
        hostname: 'kqyspmbkzwmwfufzydly.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // 만약 다른 도메인도 사용한다면 여기에 추가
    ],
  },

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
  swSrc: 'worker/index.js',
};

// withPWA를 먼저 적용하고, 그 결과에 nextConfig를 전달
const withPwaApplied = withPWA(pwaOptions)(nextConfig);

// withSentryConfig를 마지막으로 적용
const sentryConfig = withSentryConfig(
  withBundleAnalyzer(withPwaApplied), // PWA가 적용된 nextConfig를 전달
  {
    // Sentry Webpack Plugin options
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);

export default sentryConfig;
