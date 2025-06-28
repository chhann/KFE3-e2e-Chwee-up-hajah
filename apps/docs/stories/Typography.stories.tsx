import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Theme',
  parameters: {
    docs: {
      description: {
        component: '디자인 시스템에서 사용하는 모든 테마 토큰들을 확인할 수 있습니다.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// Color Palette Showcase
const ColorShowcase = ({
  category,
  colors,
}: {
  category: string;
  colors: Record<string, string>;
}) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3
      style={{
        fontSize: '1.125rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: 'var(--color-neutral-900)',
      }}
    >
      {category}
    </h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
      }}
    >
      {Object.entries(colors).map(([key, value]) => (
        <div
          key={key}
          style={{
            padding: '1rem',
            backgroundColor: 'var(--color-neutral-0)',
            borderRadius: '8px',
            border: '1px solid var(--border-secondary)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '3rem',
              backgroundColor: value,
              borderRadius: '4px',
              marginBottom: '0.5rem',
              border: '1px solid var(--border-secondary)',
            }}
          />
          <div
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              fontWeight: 500,
            }}
          >
            {key}
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-family-mono)',
            }}
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Spacing Showcase
const SpacingShowcase = () => {
  const spacings = {
    '0': 'var(--spacing-0)',
    px: 'var(--spacing-px)',
    '0.5': 'var(--spacing-0_5)',
    '1': 'var(--spacing-1)',
    '1.5': 'var(--spacing-1_5)',
    '2': 'var(--spacing-2)',
    '2.5': 'var(--spacing-2_5)',
    '3': 'var(--spacing-3)',
    '3.5': 'var(--spacing-3_5)',
    '4': 'var(--spacing-4)',
    '5': 'var(--spacing-5)',
    '6': 'var(--spacing-6)',
    '7': 'var(--spacing-7)',
    '8': 'var(--spacing-8)',
    '9': 'var(--spacing-9)',
    '10': 'var(--spacing-10)',
    '12': 'var(--spacing-12)',
    '16': 'var(--spacing-16)',
    '20': 'var(--spacing-20)',
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3
        style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: 'var(--color-neutral-900)',
        }}
      >
        Spacing
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Object.entries(spacings).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              border: '1px solid var(--border-secondary)',
            }}
          >
            <div
              style={{
                minWidth: '60px',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              {key}
            </div>
            <div
              style={{
                width: `calc(${value} * 2)`,
                height: '1.5rem',
                backgroundColor: 'var(--color-primary-500)',
                borderRadius: '4px',
              }}
            />
            <code
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--color-neutral-0)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                color: 'var(--text-secondary)',
              }}
            >
              {value}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
};

// Radius Showcase
const RadiusShowcase = () => {
  const radii = {
    none: 'var(--radius-none)',
    sm: 'var(--radius-sm)',
    default: 'var(--radius)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    '3xl': 'var(--radius-3xl)',
    full: 'var(--radius-full)',
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3
        style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: 'var(--color-neutral-900)',
        }}
      >
        Border Radius
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Object.entries(radii).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              border: '1px solid var(--border-secondary)',
            }}
          >
            <div
              style={{
                minWidth: '60px',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              {key}
            </div>
            <div
              style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: 'var(--color-primary-500)',
                borderRadius: value,
              }}
            />
            <code
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--color-neutral-0)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                color: 'var(--text-secondary)',
              }}
            >
              {value}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
};

// Border Width Showcase
const BorderWidthShowcase = () => {
  const borders = {
    '0': 'var(--border-width-0)',
    default: 'var(--border-width)',
    '2': 'var(--border-width-2)',
    '4': 'var(--border-width-4)',
    '8': 'var(--border-width-8)',
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3
        style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: 'var(--color-neutral-900)',
        }}
      >
        Border Width
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Object.entries(borders).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              border: '1px solid var(--border-secondary)',
            }}
          >
            <div
              style={{
                minWidth: '60px',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              {key}
            </div>
            <div
              style={{
                width: '6rem',
                height: '2rem',
                border: `${value} solid var(--color-primary-500)`,
                borderRadius: '4px',
              }}
            />
            <code
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--color-neutral-0)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                color: 'var(--text-secondary)',
              }}
            >
              {value}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
};

// Shadow Showcase
const ShadowShowcase = () => {
  const shadows = {
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    default: 'var(--shadow)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
    '2xl': 'var(--shadow-2xl)',
    inner: 'var(--shadow-inner)',
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3
        style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: 'var(--color-neutral-900)',
        }}
      >
        Shadows
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Object.entries(shadows).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              border: '1px solid var(--border-secondary)',
            }}
          >
            <div
              style={{
                minWidth: '60px',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              {key}
            </div>
            <div
              style={{
                width: '6rem',
                height: '3rem',
                backgroundColor: 'var(--color-neutral-0)',
                boxShadow: value,
                borderRadius: '4px',
              }}
            />
            <code
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--color-neutral-0)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                color: 'var(--text-secondary)',
              }}
            >
              {value}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
};

// Transition Duration Showcase
const TransitionDurationShowcase = () => {
  const durations = {
    '75': 'var(--duration-75)',
    '100': 'var(--duration-100)',
    '150': 'var(--duration-150)',
    '200': 'var(--duration-200)',
    '300': 'var(--duration-300)',
    '500': 'var(--duration-500)',
    '700': 'var(--duration-700)',
    '1000': 'var(--duration-1000)',
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3
        style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: 'var(--color-neutral-900)',
        }}
      >
        Transition Durations
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Object.entries(durations).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              border: '1px solid var(--border-secondary)',
            }}
          >
            <div
              style={{
                minWidth: '60px',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              {key}
            </div>
            <div
              style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: 'var(--color-primary-500)',
                borderRadius: '4px',
                transition: `transform ${value} var(--ease-in-out)`,
                transform: 'translateX(0)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(2rem)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
            />
            <code
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--color-neutral-0)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                color: 'var(--text-secondary)',
              }}
            >
              {value}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
};

// Z-Index Showcase
const ZIndexShowcase = () => {
  const zIndices = {
    '0': 'var(--z-0)',
    '10': 'var(--z-10)',
    '20': 'var(--z-20)',
    '30': 'var(--z-30)',
    '40': 'var(--z-40)',
    '50': 'var(--z-50)',
    auto: 'var(--z-auto)',
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3
        style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: 'var(--color-neutral-900)',
        }}
      >
        Z-Index
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Object.entries(zIndices).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              border: '1px solid var(--border-secondary)',
            }}
          >
            <div
              style={{
                minWidth: '60px',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              {key}
            </div>
            <div
              style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: `var(--color-primary-${50 * (parseInt(key) / 10 + 1) || 500})`,
                borderRadius: '4px',
                zIndex: key === 'auto' ? 'auto' : parseInt(key),
                position: 'relative',
                left: `${parseInt(key) * 5}px`,
              }}
            />
            <code
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--color-neutral-0)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                color: 'var(--text-secondary)',
              }}
            >
              {value}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Story
export const AllThemeTokens: Story = {
  render: () => (
    <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-family-primary)',
        }}
      >
        🎨 Theme Tokens
      </h1>

      <ColorShowcase
        category="Primary Colors"
        colors={{
          'primary-900': 'var(--color-primary-900)',
          'primary-800': 'var(--color-primary-800)',
          'primary-700': 'var(--color-primary-700)',
          'primary-600': 'var(--color-primary-600)',
          'primary-500': 'var(--color-primary-500)',
          'primary-400': 'var(--color-primary-400)',
          'primary-300': 'var(--color-primary-300)',
          'primary-200': 'var(--color-primary-200)',
          'primary-100': 'var(--color-primary-100)',
          'primary-50': 'var(--color-primary-50)',
        }}
      />

      <ColorShowcase
        category="Neutral Colors"
        colors={{
          'neutral-900': 'var(--color-neutral-900)',
          'neutral-800': 'var(--color-neutral-800)',
          'neutral-700': 'var(--color-neutral-700)',
          'neutral-600': 'var(--color-neutral-600)',
          'neutral-500': 'var(--color-neutral-500)',
          'neutral-400': 'var(--color-neutral-400)',
          'neutral-300': 'var(--color-neutral-300)',
          'neutral-200': 'var(--color-neutral-200)',
          'neutral-100': 'var(--color-neutral-100)',
          'neutral-50': 'var(--color-neutral-50)',
          'neutral-0': 'var(--color-neutral-0)',
        }}
      />

      <ColorShowcase
        category="Status Colors"
        colors={{
          'success-500': 'var(--color-success-500)',
          'error-500': 'var(--color-error-500)',
          'warning-500': 'var(--color-warning-500)',
          'info-500': 'var(--color-info-500)',
        }}
      />

      <ColorShowcase
        category="Text Colors"
        colors={{
          'text-primary': 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          'text-tertiary': 'var(--text-tertiary)',
          'text-disabled': 'var(--text-disabled)',
          'text-inverse': 'var(--text-inverse)',
          'text-accent': 'var(--text-accent)',
          'text-success': 'var(--text-success)',
          'text-error': 'var(--text-error)',
          'text-warning': 'var(--text-warning)',
        }}
      />

      <ColorShowcase
        category="Backgrounds"
        colors={{
          'bg-primary': 'var(--bg-primary)',
          'bg-secondary': 'var(--bg-secondary)',
          'bg-tertiary': 'var(--bg-tertiary)',
          'bg-disabled': 'var(--bg-disabled)',
          'bg-overlay': 'var(--bg-overlay)',
        }}
      />

      <ColorShowcase
        category="Borders"
        colors={{
          'border-primary': 'var(--border-primary)',
          'border-secondary': 'var(--border-secondary)',
          'border-accent': 'var(--border-accent)',
          'border-error': 'var(--border-error)',
          'border-disabled': 'var(--border-disabled)',
        }}
      />

      <SpacingShowcase />
      <RadiusShowcase />
      <BorderWidthShowcase />
      <ShadowShowcase />
      <TransitionDurationShowcase />
      <ZIndexShowcase />

      {/* Usage Guide */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '8px',
          border: '1px solid var(--border-secondary)',
        }}
      >
        <h4
          style={{
            fontWeight: 500,
            marginBottom: '0.5rem',
            color: 'var(--text-primary)',
          }}
        >
          💡 사용 방법
        </h4>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <code
              style={{
                backgroundColor: 'var(--color-neutral-0)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              var(--color-primary-500)
            </code>{' '}
            - 색상 값 사용
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <code
              style={{
                backgroundColor: 'var(--color-neutral-0)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              var(--spacing-4)
            </code>{' '}
            - 스페이싱 값 사용
          </div>
          <div>
            <code
              style={{
                backgroundColor: 'var(--color-neutral-0)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              var(--shadow-md)
            </code>{' '}
            - 그림자 값 사용
          </div>
        </div>
      </div>
    </div>
  ),
};

// Individual Stories
export const Colors: Story = {
  render: () => (
    <div style={{ padding: '1.5rem' }}>
      <ColorShowcase
        category="Primary Colors"
        colors={{
          'primary-900': 'var(--color-primary-900)',
          'primary-800': 'var(--color-primary-800)',
          'primary-700': 'var(--color-primary-700)',
          'primary-600': 'var(--color-primary-600)',
          'primary-500': 'var(--color-primary-500)',
          'primary-400': 'var(--color-primary-400)',
          'primary-300': 'var(--color-primary-300)',
          'primary-200': 'var(--color-primary-200)',
          'primary-100': 'var(--color-primary-100)',
          'primary-50': 'var(--color-primary-50)',
        }}
      />
      <ColorShowcase
        category="Neutral Colors"
        colors={{
          'neutral-900': 'var(--color-neutral-900)',
          'neutral-800': 'var(--color-neutral-800)',
          'neutral-700': 'var(--color-neutral-700)',
          'neutral-600': 'var(--color-neutral-600)',
          'neutral-500': 'var(--color-neutral-500)',
          'neutral-400': 'var(--color-neutral-400)',
          'neutral-300': 'var(--color-neutral-300)',
          'neutral-200': 'var(--color-neutral-200)',
          'neutral-100': 'var(--color-neutral-100)',
          'neutral-50': 'var(--color-neutral-50)',
          'neutral-0': 'var(--color-neutral-0)',
        }}
      />
      <ColorShowcase
        category="Status Colors"
        colors={{
          'success-500': 'var(--color-success-500)',
          'error-500': 'var(--color-error-500)',
          'warning-500': 'var(--color-warning-500)',
          'info-500': 'var(--color-info-500)',
        }}
      />
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ padding: '1.5rem' }}>
      <SpacingShowcase />
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div style={{ padding: '1.5rem' }}>
      <RadiusShowcase />
    </div>
  ),
};

export const BorderWidth: Story = {
  render: () => (
    <div style={{ padding: '1.5rem' }}>
      <BorderWidthShowcase />
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div style={{ padding: '1.5rem' }}>
      <ShadowShowcase />
    </div>
  ),
};

export const TransitionDurations: Story = {
  render: () => (
    <div style={{ padding: '1.5rem' }}>
      <TransitionDurationShowcase />
    </div>
  ),
};

export const ZIndex: Story = {
  render: () => (
    <div style={{ padding: '1.5rem' }}>
      <ZIndexShowcase />
    </div>
  ),
};
