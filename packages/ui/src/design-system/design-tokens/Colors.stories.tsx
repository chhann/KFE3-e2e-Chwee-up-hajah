import type { Meta, StoryObj } from '@storybook/nextjs';
// 같은 폴더에 있으니 ./ 사용
import { colors, colorUtils } from './colors';

const meta: Meta = {
  title: 'Design System/Design Tokens/Colors',
  parameters: {
    docs: {
      description: {
        component: '디자인 시스템에서 사용하는 모든 컬러 토큰들을 확인할 수 있습니다.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// 실제 헥스 값 매핑
const actualColorValues = {
  'var(--color-primary-900)': '#302749',
  'var(--color-primary-800)': '#372d84',
  'var(--color-primary-700)': '#4534b0',
  'var(--color-primary-600)': '#444ae2',
  'var(--color-primary-500)': '#7251f8',
  'var(--color-primary-400)': '#8e74f9',
  'var(--color-primary-300)': '#a18afa',
  'var(--color-primary-200)': '#beaffc',
  'var(--color-primary-100)': '#d3c9fd',
  'var(--color-primary-50)': '#eeeeff',
  'var(--color-neutral-100)': '#1f1f1f',
  'var(--color-neutral-80)': '#444444',
  'var(--color-neutral-70)': '#656565',
  'var(--color-neutral-60)': '#8f8f8f',
  'var(--color-neutral-40)': '#8f8f8f',
  'var(--color-neutral-30)': '#8f8f8f',
  'var(--color-neutral-20)': '#e8e8e8',
  'var(--color-neutral-10)': '#f4f4f7',
  'var(--color-neutral-0)': '#ffffff',
  'var(--color-red-500)': '#ef4444',
  'var(--color-yellow-500)': '#eab308',
  'var(--color-disabled-bg)': '#f1eefe',
  'var(--color-disabled-text)': '#656565',
};

const getActualColorValue = (cssVar: string): string => {
  return actualColorValues[cssVar as keyof typeof actualColorValues] || cssVar;
};

// 색상 팔레트 컴포넌트
const ColorPalette = ({ title, colorSet }: { title: string; colorSet: Record<string, string> }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3
      style={{
        fontSize: '1.125rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: '#1f1f1f',
      }}
    >
      {title}
    </h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '1rem',
      }}
    >
      {Object.entries(colorSet).map(([key, value]) => {
        const actualValue = getActualColorValue(value);
        return (
          <div key={key} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '100%',
                height: '80px',
                borderRadius: '8px',
                border: '1px solid #e8e8e8',
                marginBottom: '0.5rem',
                backgroundColor: actualValue,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            />
            <div style={{ fontSize: '0.875rem' }}>
              <div
                style={{
                  fontWeight: 500,
                  color: '#1f1f1f',
                  marginBottom: '0.25rem',
                }}
              >
                {key}
              </div>
              <div
                style={{
                  color: '#656565',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  marginBottom: '0.25rem',
                }}
              >
                {value}
              </div>
              <div
                style={{
                  color: '#8f8f8f',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                }}
              >
                {actualValue}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export const AllColorTokens: Story = {
  render: () => (
    <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: '#1f1f1f',
        }}
      >
        🎨 Design Tokens - Colors
      </h1>

      <ColorPalette title="Primary Colors (브랜딩 컬러)" colorSet={colors.primary} />
      <ColorPalette title="Neutral Colors (회색조)" colorSet={colors.neutral} />
      <ColorPalette title="Status Colors (상태)" colorSet={colors.status} />
      <ColorPalette title="Disabled States (비활성)" colorSet={colors.disabled} />

      {/* 시멘틱 컬러 */}
      <div style={{ marginTop: '2rem' }}>
        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#1f1f1f',
          }}
        >
          Semantic Colors (의미적 색상)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { name: 'Text Primary', value: colorUtils.semantic.textPrimary },
            { name: 'Text Secondary', value: colorUtils.semantic.textSecondary },
            { name: 'Background Primary', value: colorUtils.semantic.backgroundPrimary },
            { name: 'Background Secondary', value: colorUtils.semantic.backgroundSecondary },
            { name: 'Brand Primary', value: colorUtils.semantic.brandPrimary },
            { name: 'Success', value: colorUtils.semantic.success },
            { name: 'Error', value: colorUtils.semantic.error },
            { name: 'Warning', value: colorUtils.semantic.warning },
          ].map(({ name, value }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '4px',
                  border: '1px solid #e8e8e8',
                  backgroundColor: getActualColorValue(value),
                }}
              />
              <div>
                <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{name}</div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: '#656565',
                    fontFamily: 'monospace',
                  }}
                >
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 사용법 가이드 */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f4f4f7',
          borderRadius: '8px',
          border: '1px solid #e8e8e8',
        }}
      >
        <h4
          style={{
            fontWeight: 500,
            marginBottom: '0.5rem',
            color: '#1f1f1f',
          }}
        >
          💡 사용 방법
        </h4>
        <div style={{ fontSize: '0.875rem', color: '#656565' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <code
              style={{
                backgroundColor: '#ffffff',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontFamily: 'monospace',
              }}
            >
              colors.primary[500]
            </code>{' '}
            - CSS 변수로 반환
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <code
              style={{
                backgroundColor: '#ffffff',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontFamily: 'monospace',
              }}
            >
              colorUtils.getPrimary(&apos;500&apos;)
            </code>{' '}
            - 유틸리티 함수 사용
          </div>
          <div>
            <code
              style={{
                backgroundColor: '#ffffff',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontFamily: 'monospace',
              }}
            >
              colorUtils.semantic.textPrimary
            </code>{' '}
            - 의미적 색상 사용
          </div>
        </div>
      </div>
    </div>
  ),
};

export const PrimaryOnly: Story = {
  render: () => (
    <div style={{ padding: '1.5rem' }}>
      <ColorPalette title="Primary Colors" colorSet={colors.primary} />
    </div>
  ),
};
