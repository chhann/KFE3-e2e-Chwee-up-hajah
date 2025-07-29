'use client';

import {
  LayoutGrid,
  Tv,
  BookText,
  Sparkles,
  Briefcase,
  Dumbbell,
  Watch,
  Shirt,
  CookingPot,
  MoreHorizontal,
  type LucideProps,
} from 'lucide-react';
import { categoryStyle } from './Category.Styles';

// 1. 카테고리 제목과 Lucide 아이콘 컴포넌트를 매핑
const categoryIconMap: { [key: string]: React.ComponentType<LucideProps> } = {
  전체: LayoutGrid,
  '가전/전자': Tv,
  '도서/티켓': BookText,
  뷰티: Sparkles,
  '사무/잡화': Briefcase,
  스포츠용품: Dumbbell,
  악세서리: Watch,
  의류: Shirt,
  '생활/주방': CookingPot,
  기타: MoreHorizontal,
};

// 2. Props 인터페이스 수정
export interface CategoryProps {
  categories: { title: string }[];
  className?: string;
  selectedCategory?: string | null;
  onCategoryClick?: (cat: string) => void;
}

export default function Category({
  categories,
  className,
  selectedCategory,
  onCategoryClick,
}: CategoryProps) {
  return (
    <div className={`w-full ${className ?? ''} `}>
      <div className={categoryStyle.categoryContainerStyle}>
        {categories.map((item, i) => {
          // 3. 매핑된 아이콘 컴포넌트를 가져오기 (없으면 '기타' 아이콘 사용)
          const IconComponent = categoryIconMap[item.title] || MoreHorizontal;
          return (
            <div
              key={i}
              className={categoryStyle.categoryItemStyle}
              onClick={() => onCategoryClick?.(item.title)}
            >
              <div
                className={`${categoryStyle.categoryImageStyle} ${
                  selectedCategory === item.title
                    ? 'border-[2px] border-[#484848] bg-[#ffffff] text-[#484848]'
                    : 'bg-[#484848] text-[#ffffff]'
                }`}
              >
                {/* 4. 아이콘 컴포넌트 렌더링 */}
                <IconComponent size={24} />
              </div>
              <span className={categoryStyle.categoryItemTextStyle}>{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
