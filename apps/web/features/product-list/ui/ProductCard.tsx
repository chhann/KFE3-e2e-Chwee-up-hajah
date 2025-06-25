import { Product } from '../../../widgets/productList/types';

interface ProductCardProps {
  item: Product;
  layout?: 'horizontal' | 'vertical';
}

export const ProductCard = ({ item, layout = 'vertical' }: ProductCardProps) => {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-white ${
        layout === 'horizontal'
          ? 'flex h-[211px] w-[140px] flex-col p-2'
          : 'flex w-full gap-3 p-3 shadow-sm'
      }`}
    >
      {/* 이미지 */}
      <div
        className={`${
          layout === 'horizontal'
            ? 'mb-2 h-[77px] w-full overflow-hidden rounded-md bg-[#D9D9D9]'
            : 'h-24 w-24 overflow-hidden rounded-md bg-[#D9D9D9]'
        } flex-shrink-0`}
      >
        {item.image && (
          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
        )}
      </div>

      {/* 텍스트 정보 */}
      <div className={`${layout === 'horizontal' ? '' : 'flex flex-col justify-between'}`}>
        <p className="text-sm font-semibold">{item.title}</p>

        {layout === 'horizontal' ? (
          <>
            <p className="text-xs text-gray-500">{item.distance}</p>
            <p className="text-xs text-gray-500">⏱ {item.timeLeft}</p>
            <p className="text-xs text-gray-400">현재입찰가</p>
            <p className="text-sm font-bold">{item.price.toLocaleString()}원</p>
          </>
        ) : (
          <>
            {item.location && <p className="text-xs text-pink-500">{item.location}</p>}
            <p className="text-xs text-gray-500">{item.distance}</p>
            <p className="text-xs text-gray-400">현재입찰가</p>
            <p className="text-sm font-bold">{item.price.toLocaleString()}원</p>
          </>
        )}
      </div>
    </div>
  );
};
