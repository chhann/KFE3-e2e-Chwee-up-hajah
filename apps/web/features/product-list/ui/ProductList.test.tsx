
import { render, screen } from '@testing-library/react';
import { ProductList } from './ProductList';

describe('ProductList', () => {
  const mockProducts = [
    {
      id: '1',
      title: 'Product 1',
      distance: '1km',
      timeLeft: '1시간',
      price: 100,
      location: '서울',
      image: '/images/product1.jpg',
    },
    {
      id: '2',
      title: 'Product 2',
      distance: '2km',
      timeLeft: '2시간',
      price: 200,
      location: '부산',
      image: '/images/product2.jpg',
    },
  ];

  it('renders a list of product cards', () => {
    render(<ProductList items={mockProducts} direction="vertical" />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('renders a message when no products are available', () => {
    render(<ProductList items={[]} direction="vertical" />);

    expect(screen.getByText('No products available.')).toBeInTheDocument();
  });
});
