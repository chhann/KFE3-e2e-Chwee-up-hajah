import Link from 'next/link';
import { Product } from '../../../widgets/product-section/types';
import { Styles } from './styles/product-card.styles';

interface ProductCardProps {
  item: Product;
  layout?: 'horizontal' | 'vertical';
}

export const ProductCard = ({ item, layout = 'vertical' }: ProductCardProps) => {
  return (
    <Link href={`/auction/${item.id}/auction-detail`}>
      <div className={Styles.container(layout)}>
        {/* 이미지 */}
        <div className={Styles.imageContainer(layout)}>
          {item.image && <img src={item.image} alt={item.title} className={Styles.image} />}
        </div>

        {/* 텍스트 정보 */}
        <div className={Styles.contentContainer(layout)}>
          <p className={Styles.title}>{item.title}</p>

          {layout === 'horizontal' ? (
            <>
              <p className={Styles.distance}>{item.distance}</p>
              <p className={Styles.timeLeft}>⏱ {item.timeLeft}</p>
              <p className={Styles.priceLabel}>현재입찰가</p>
              <p className={Styles.price}>{item.price.toLocaleString()}원</p>
            </>
          ) : (
            <>
              {item.location && <p className={Styles.location}>{item.location}</p>}
              <p className={Styles.distance}>{item.distance}</p>
              <p className={Styles.priceLabel}>현재입찰가</p>
              <p className={Styles.price}>{item.price.toLocaleString()}원</p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
