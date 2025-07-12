import { Card } from '@repo/ui/design-system/base-components/Card/index';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Design System/Base Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
카드(Card) 컴포넌트입니다.

## 주요 기능
- ✅ 이미지, 제목, 위치, 남은 시간, 뱃지(인기/마감임박) 표시
- ✅ 다양한 props로 커스터마이즈 가능
- ✅ 반응형 레이아웃 지원
- ✅ 스토리북에서 다양한 예시 확인 가능
        `,
      },
    },
  },
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  argTypes: {
    imageSrc: {
      control: { type: 'text' },
      description: '카드에 표시될 이미지의 URL',
    },
    title: {
      control: { type: 'text' },
      description: '카드의 제목',
    },
    locationName: {
      control: { type: 'text' },
      description: '장소명',
    },
    badgeVariant: {
      control: { type: 'radio' },
      options: ['best', 'urgent', undefined],
      description: '뱃지 타입 (인기/마감임박)',
    },
    endTime: {
      control: { type: 'date' },
      description: '종료일(Date 또는 ISO 문자열)',
    },
    startTime: {
      control: { type: 'date' },
      description: '시작일(Date 또는 ISO 문자열)',
    },
  },
  args: {
    imageSrc: 'https://picsum.photos/300/200',
    title: '기본 카드 제목',
    locationName: '서울 강남구',
    badgeVariant: 'best',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 10 + 1000 * 60 * 30).toISOString(), // 10시간 30분 후
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2시간 전 시작
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// 📝 기본 카드
export const Default: Story = {
  args: {
    imageSrc: 'https://picsum.photos/300/200?random=1',
    title: '아름다운 풍경',
    locationName: '부산 해운대',
    badgeVariant: 'best',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 5 + 1000 * 60 * 10).toISOString(), // 5시간 10분 후
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1시간 전 시작
  },
};

// 📝 경매 시작 전 카드
export const BeforeStart: Story = {
  args: {
    imageSrc: 'https://picsum.photos/300/200?random=5',
    title: '경매 시작 전 상품',
    locationName: '서울 강남구',
    badgeVariant: undefined,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24시간 후 종료
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // 2시간 후 시작
  },
};

// 📝 마감임박 카드
export const Urgent: Story = {
  args: {
    imageSrc: 'https://picsum.photos/300/200?random=2',
    title: '마감 임박 상품',
    locationName: '인천 송도',
    badgeVariant: 'urgent',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 1 + 1000 * 60 * 5).toISOString(), // 1시간 5분 후
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3시간 전 시작
  },
};

// 📝 위치/뱃지 없는 카드
export const NoBadgeNoLocation: Story = {
  args: {
    imageSrc: 'https://picsum.photos/300/200?random=3',
    title: '위치/뱃지 없음',
    locationName: '',
    badgeVariant: undefined,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
  },
};

// 📝 긴 제목 카드
export const LongTitle: Story = {
  args: {
    imageSrc: 'https://picsum.photos/300/200?random=4',
    title: '매우 긴 제목을 가진 카드 컴포넌트가 어떻게 보이는지 확인해보는 테스트',
    locationName: '제주도',
    badgeVariant: 'best',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
  },
};

// 📝 다양한 카드들을 한 번에 보기
export const Gallery: Story = {
  render: () => (
    <div className="grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card
        imageSrc="https://picsum.photos/300/200?random=10"
        title="자연 풍경"
        locationName="서울"
        badgeVariant="best"
        endTime={new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString()}
      />
      <Card
        imageSrc="https://picsum.photos/300/200?random=11"
        title="도시 야경"
        locationName="부산"
        badgeVariant="urgent"
        endTime={new Date(Date.now() + 1000 * 60 * 60 * 1).toISOString()}
      />
      <Card
        imageSrc="https://picsum.photos/300/200?random=12"
        title="바다와 해변"
        locationName="제주"
        badgeVariant={undefined}
        endTime={new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString()}
      />
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
