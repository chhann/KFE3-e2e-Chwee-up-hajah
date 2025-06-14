/**
 * Design System Color Tokens
 * global.css의 CSS 변수와 연동되는 컬러 토큰 정의
 */

export const colors = {
  // Primary Colors (브랜딩 컬러)
  primary: {
    900: 'var(--color-primary-900)', // #302749
    800: 'var(--color-primary-800)', // #372d84
    700: 'var(--color-primary-700)', // #4534b0
    600: 'var(--color-primary-600)', // #444ae2
    500: 'var(--color-primary-500)', // #7251f8 - 메인 브랜드 컬러
    400: 'var(--color-primary-400)', // #8e74f9
    300: 'var(--color-primary-300)', // #a18afa
    200: 'var(--color-primary-200)', // #beaffc
    100: 'var(--color-primary-100)', // #d3c9fd
    50: 'var(--color-primary-50)', // #eeeeff
  },

  // Neutral Colors (회색조 - 텍스트, 배경, 보더용)
  neutral: {
    100: 'var(--color-neutral-100)', // #1f1f1f - 메인 텍스트 컬러
    80: 'var(--color-neutral-80)', // #444444 - 진한 회색 텍스트
    70: 'var(--color-neutral-70)', // #656565 - 보조 텍스트
    60: 'var(--color-neutral-60)', // #8f8f8f - 비활성 텍스트
    40: 'var(--color-neutral-40)', // #8f8f8f
    30: 'var(--color-neutral-30)', // #8f8f8f
    20: 'var(--color-neutral-20)', // #e8e8e8 - 보더, 구분선
    10: 'var(--color-neutral-10)', // #f4f4f7 - 배경색
    0: 'var(--color-neutral-0)', // #ffffff - 흰색 배경
  },

  // Status Colors (상태 표시용)
  status: {
    error: 'var(--color-red-500)', // #ef4444 - 에러, 삭제
    warning: 'var(--color-yellow-500)', // #eab308 - 경고, 주의
  },

  // Disabled States (비활성 상태)
  disabled: {
    background: 'var(--color-disabled-bg)', // #f1eefe - 비활성 배경
    text: 'var(--color-disabled-text)', // #656565 - 비활성 텍스트
  },
} as const;

// 색상 타입 정의
export type ColorToken = typeof colors;
export type PrimaryColor = keyof typeof colors.primary;
export type NeutralColor = keyof typeof colors.neutral;
export type StatusColor = keyof typeof colors.status;

// 색상 유틸리티 함수들
export const colorUtils = {
  /**
   * Primary 색상 가져오기
   * @example colorUtils.getPrimary('500') → 'var(--color-primary-500)'
   */
  getPrimary: (shade: PrimaryColor) => colors.primary[shade],

  /**
   * Neutral 색상 가져오기
   * @example colorUtils.getNeutral('20') → 'var(--color-neutral-20)'
   */
  getNeutral: (shade: NeutralColor) => colors.neutral[shade],

  /**
   * Status 색상 가져오기
   * @example colorUtils.getStatus('error') → 'var(--color-red-500)'
   */
  getStatus: (type: StatusColor) => colors.status[type],

  /**
   * 컴포넌트에서 자주 사용하는 색상 조합
   */
  semantic: {
    // 텍스트 색상 (global.css body 기본값 기준)
    textPrimary: colors.neutral[100], // 메인 텍스트
    textSecondary: colors.neutral[70], // 보조 텍스트
    textTertiary: colors.neutral[60], // 비활성/힌트 텍스트
    textDisabled: colors.disabled.text, // 비활성 텍스트

    // 배경 색상 (global.css body 기본값 기준)
    backgroundPrimary: colors.neutral[0], // 메인 배경 (흰색)
    backgroundSecondary: colors.neutral[10], // 서브 배경 (연한 회색)
    backgroundDisabled: colors.disabled.background, // 비활성 배경

    // 보더 색상
    borderDefault: colors.neutral[20], // 기본 보더
    borderActive: colors.primary[300], // 활성/포커스 보더
    borderError: colors.status.error, // 에러 보더

    // 상태별 브랜드 색상
    brandPrimary: colors.primary[500], // 메인 브랜드 컬러
    brandSecondary: colors.primary[100], // 서브 브랜드 컬러

    // 액션 색상
    success: colors.primary[500], // 성공 (브랜드 컬러 사용)
    error: colors.status.error, // 에러
    warning: colors.status.warning, // 경고
  },
};

// Tailwind에서 사용할 수 있는 CSS 변수 맵
export const tailwindColors = {
  // Primary 색상들
  'primary-900': colors.primary[900],
  'primary-800': colors.primary[800],
  'primary-700': colors.primary[700],
  'primary-600': colors.primary[600],
  'primary-500': colors.primary[500],
  'primary-400': colors.primary[400],
  'primary-300': colors.primary[300],
  'primary-200': colors.primary[200],
  'primary-100': colors.primary[100],
  'primary-50': colors.primary[50],

  // Neutral 색상들
  'neutral-100': colors.neutral[100],
  'neutral-80': colors.neutral[80],
  'neutral-70': colors.neutral[70],
  'neutral-60': colors.neutral[60],
  'neutral-40': colors.neutral[40],
  'neutral-30': colors.neutral[30],
  'neutral-20': colors.neutral[20],
  'neutral-10': colors.neutral[10],
  'neutral-0': colors.neutral[0],

  // Status 색상들
  error: colors.status.error,
  warning: colors.status.warning,

  // Disabled 색상들
  'disabled-bg': colors.disabled.background,
  'disabled-text': colors.disabled.text,
} as const;
