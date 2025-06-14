import type { Meta, StoryObj } from '@storybook/nextjs';
import Card from './Card';

const meta = {
  title: 'Design System/Base Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Card 컴포넌트는 이미지와 제목을 포함한 카드 형태의 UI를 제공합니다. Next.js Image 컴포넌트를 사용하여 이미지 최적화를 지원합니다.',
      },
    },
  },
  argTypes: {
    imageSrc: {
      control: { type: 'text' },
      description: '카드에 표시될 이미지의 URL',
    },
    title: {
      control: { type: 'text' },
      description: '카드의 제목',
    },
  },
  args: {
    imageSrc: 'https://picsum.photos/300/200',
    title: '기본 카드 제목',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// 📝 기본 카드
export const Default: Story = {
  args: {
    imageSrc: 'https://picsum.photos/300/200?random=1',
    title: '아름다운 풍경',
  },
};

// 📝 제품 카드
export const Product: Story = {
  args: {
    imageSrc: 'https://picsum.photos/300/200?random=2',
    title: '프리미엄 노트북',
  },
};

// 📝 여행 카드
export const Travel: Story = {
  args: {
    imageSrc: 'https://picsum.photos/300/200?random=3',
    title: '파리 에펠탑 투어',
  },
};

// 📝 긴 제목 카드
export const LongTitle: Story = {
  args: {
    imageSrc: 'https://picsum.photos/300/200?random=4',
    title: '매우 긴 제목을 가진 카드 컴포넌트가 어떻게 보이는지 확인해보는 테스트',
  },
};

// 📝 짧은 제목 카드
export const ShortTitle: Story = {
  args: {
    imageSrc: 'https://picsum.photos/300/200?random=5',
    title: '짧은 제목',
  },
};

// 📝 음식 카드
export const Food: Story = {
  args: {
    imageSrc: 'https://picsum.photos/300/200?random=6',
    title: '맛있는 파스타',
  },
};

// 📝 기술 카드
export const Technology: Story = {
  args: {
    imageSrc: 'https://picsum.photos/300/200?random=7',
    title: 'AI와 머신러닝의 미래',
  },
};

// 📝 다양한 카드들을 한 번에 보기
export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <Card imageSrc="https://picsum.photos/300/200?random=10" title="자연 풍경" />
      <Card imageSrc="https://picsum.photos/300/200?random=11" title="도시 야경" />
      <Card imageSrc="https://picsum.photos/300/200?random=12" title="바다와 해변" />
      <Card imageSrc="https://picsum.photos/300/200?random=13" title="산악 지대" />
      <Card imageSrc="https://picsum.photos/300/200?random=14" title="건축물" />
      <Card imageSrc="https://picsum.photos/300/200?random=15" title="예술 작품" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '여러 카드를 그리드 레이아웃으로 배치한 갤러리 형태입니다.',
      },
    },
  },
};

// 📝 로딩 상태 (이미지 로드 실패 시뮬레이션)
export const BrokenImage: Story = {
  args: {
    imageSrc: 'https://broken-image-url.com/image.jpg',
    title: '이미지 로드 실패 테스트',
  },
  parameters: {
    docs: {
      description: {
        story: '이미지 URL이 잘못되었을 때의 카드 모습을 확인할 수 있습니다.',
      },
    },
  },
};

// 📝 반응형 테스트
export const ResponsiveTest: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">데스크톱 크기</h3>
      <div className="w-full max-w-sm">
        <Card imageSrc="https://picsum.photos/300/200?random=20" title="반응형 카드 테스트" />
      </div>

      <h3 className="text-lg font-semibold">모바일 크기</h3>
      <div className="w-full max-w-xs">
        <Card imageSrc="https://picsum.photos/300/200?random=21" title="모바일에서의 카드" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 화면 크기에서의 카드 컴포넌트 모습을 확인할 수 있습니다.',
      },
    },
  },
};
