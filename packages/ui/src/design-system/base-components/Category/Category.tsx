'use client';

import { categoryStyle } from './Category.Styles';

export interface CategoryProps {
  categories: { title: string; imageUrl: string }[];
  className?: string;
  selectedCategory?: string | null; // 선택된 카테고리 상태
  onCategoryClick?: (cat: string) => void;
}

export default function Category({
  categories,
  className,
  selectedCategory,
  onCategoryClick,
}: CategoryProps) {
  return (
    <div className={`w-full ${className ?? ''}`}>
      <div className={categoryStyle.categoryContainerStyle}>
        {categories.map((item, i) => (
          <div
            key={i}
            className={categoryStyle.categoryItemStyle}
            onClick={() => onCategoryClick?.(item.title)}
          >
            <div
              className={`${categoryStyle.categoryImageStyle} ${
                selectedCategory === item.title ? 'border-2' : 'border-1'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className={categoryStyle.categoryInnerImageStyle}
              />
            </div>
            <span className={categoryStyle.categoryItemTextStyle}>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
