import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    title: 'Test Product',
    distance: '1km',
    timeLeft: '1시간',
    price: 100,
    location: '서울',
    image: '/images/test-product.jpg',
  };

  it('renders product details correctly (horizontal layout)', () => {
    render(<ProductCard item={mockProduct} layout="horizontal" />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('1km')).toBeInTheDocument();
    expect(screen.getByText('⏱ 1시간')).toBeInTheDocument();
    expect(screen.getByText('100원')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Test Product/i })).toHaveAttribute(
      'src',
      '/images/test-product.jpg'
    );
  });
});
