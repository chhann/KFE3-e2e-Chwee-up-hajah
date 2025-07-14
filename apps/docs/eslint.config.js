import baseConfig from '@repo/eslint-config/base';
import nextConfig from '@repo/eslint-config/next';
import reactInternalConfig from '@repo/eslint-config/react-internal';

export default [
  ...baseConfig,
  ...nextConfig,
  ...reactInternalConfig,
  {
    // apps/docs 고유의 설정 (필요시 추가)
    // 예: files, rules 등
  },
];
