import { Button } from '@repo/ui/design-system/base-components/Button/index';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  component: Button,
  title: 'Design System/Base Components/Button',
  parameters: {
    docs: {
      description: {
        component: `
버튼 컴포넌트입니다.

## 주요 기능
- ✅ 다양한 variants 지원 (primary, secondary, outline, ghost, custom)
- ✅ 비활성화(disabled) 상태 지원
- ✅ 커스텀 className 적용 가능
        `,
      },
    },
  },
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  argTypes: {
    variants: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'custom'],
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'thinLg', 'md', 'thinMd', 'sm'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variants: 'primary',
    size: 'sm',
  },
};

export const Secondary: Story = {
  args: {
    children: '회원가입',
    variants: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variants: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    variants: 'ghost',
  },
};

export const Disabled: Story = {
  args: {
    children: '입찰하기',
    variants: 'primary',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-full flex-wrap gap-2">
      <Button variants="primary">입찰하기</Button>
      <Button variants="secondary">회원가입</Button>
      <Button variants="outline">아웃라인</Button>
      <Button variants="ghost">고스트</Button>
      <Button variants="primary" disabled>
        입찰하기
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 버튼 variant를 한 번에 비교해볼 수 있습니다.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-full flex-wrap gap-2">
      <Button variants="primary" size="lg">
        Large
      </Button>
      <Button variants="primary" size="thinLg">
        Thin Large
      </Button>
      <Button variants="primary" size="md">
        Medium
      </Button>
      <Button variants="primary" size="thinMd">
        Thin Medium
      </Button>
      <Button variants="primary" size="sm">
        Small
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 버튼 size를 한 번에 비교해볼 수 있습니다.',
      },
    },
  },
};
