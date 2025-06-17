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
- ✅ 다양한 variants 지원 (primary, secondary, transparent)
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
      options: ['primary', 'secondary', 'transparent'],
      description: '버튼의 스타일 variant를 선택하세요.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '버튼 비활성화 여부',
    },
    children: {
      description: '버튼 텍스트',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '입찰하기',
    className: '',
    variants: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: '회원가입',
    className: 'bg-black',
    variants: 'secondary',
  },
};

export const Transparent: Story = {
  args: {
    children: '더보기',
    className: '',
    variants: 'transparent',
  },
};

export const Disabled: Story = {
  args: {
    children: '입찰하기',
    className: '',
    variants: 'primary',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-full flex-wrap gap-2">
      <Button variants="primary">입찰하기</Button>
      <Button variants="secondary">회원가입</Button>
      <Button variants="transparent">더보기</Button>
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
