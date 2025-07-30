// types/Product.ts
export type Product = {
  id: string;
  title: string;
  category: string;
  timeLeft?: string; // optional로 둘지 필수로 둘지는 여기에 맞춤
  bidCount?: number;
  endTime?: string;
  price: number;
  image?: string;
};
