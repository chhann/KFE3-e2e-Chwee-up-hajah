import type { StoryObj, Meta } from '@storybook/nextjs';
import Badge from './Badge';

const meta = {
  component: Badge,
  title: 'Design System/Base Components/Badge',
  parameters: {
    docs: {
      description: {
        component: `
뱃지 컴포넌트 입니다.

## 주요 기능
- ✅ 새로운 variant 추가 용이 
- ✅ 커스텀 텍스트 입력 자유도 증가
- ✅ 아이콘 + 텍스트 등 다양한 컨텐츠 조합 지원 
        `,
      },
    },
  },
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['urgent', 'best'],
      description: '뱃지 타입을 선택하세요.',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Best: Story = {
  args: {
    variant: 'best',
    children: '인기',
  },
};

export const Urgent: Story = {
  args: {
    variant: 'urgent',
    children: '마감임박',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-full flex-wrap gap-2">
      <Badge variant="best">인기</Badge>
      <Badge variant="urgent">마감임박</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 뱃지를 한번에 비교해볼 수 있습니다.',
      },
    },
  },
};
