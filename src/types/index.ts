export interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  tag?: string;
  isFavorite: boolean;
  discount?: string;
}

