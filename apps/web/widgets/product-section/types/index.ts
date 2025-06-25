// types/Product.ts
export type Product = {
  id: string;
  title: string;
  distance: string;
  timeLeft?: string; // optional로 둘지 필수로 둘지는 여기에 맞춤
  location?: string;
  price: number;
  image?: string;
};