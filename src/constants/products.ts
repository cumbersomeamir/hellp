export interface Product {
  id: string;
  name: string;
  quantity: string;
  price: number;
  picture: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  tag?: string;
  isFavorite: boolean;
  discount?: string;
  originalPrice?: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Wheat',
    quantity: '1 kg',
    price: 100,
    picture: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    rating: 4.5,
    reviews: 128,
    deliveryTime: '30 mins',
    tag: 'Fresh',
    isFavorite: false,
    discount: '10%',
    originalPrice: 110
  },
  {
    id: '2',
    name: 'Rice',
    quantity: '1 kg',
    price: 50,
    picture: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    rating: 4.3,
    reviews: 95,
    deliveryTime: '25 mins',
    isFavorite: false,
    discount: '5%',
    originalPrice: 53
  },
  {
    id: '3',
    name: 'Soap',
    quantity: '10 bars',
    price: 50,
    picture: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4.2,
    reviews: 87,
    deliveryTime: '20 mins',
    tag: 'Hygiene',
    isFavorite: false
  },
  {
    id: '4',
    name: 'Shampoo',
    quantity: '100 sachets',
    price: 100,
    picture: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    rating: 4.4,
    reviews: 156,
    deliveryTime: '35 mins',
    tag: 'Personal Care',
    isFavorite: false,
    discount: '15%',
    originalPrice: 118
  },
  {
    id: '5',
    name: 'Sugar',
    quantity: '1 kg',
    price: 60,
    picture: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',
    rating: 4.1,
    reviews: 73,
    deliveryTime: '25 mins',
    isFavorite: false
  },
  {
    id: '6',
    name: 'Cooking Oil',
    quantity: '1 litre',
    price: 120,
    picture: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    rating: 4.6,
    reviews: 201,
    deliveryTime: '30 mins',
    tag: 'Cooking',
    isFavorite: false,
    discount: '8%',
    originalPrice: 130
  },
  {
    id: '7',
    name: 'Salt',
    quantity: '1 kg',
    price: 25,
    picture: 'https://images.unsplash.com/photo-1609501676725-7186f757a123?w=400',
    rating: 4.0,
    reviews: 45,
    deliveryTime: '15 mins',
    isFavorite: false
  },
  {
    id: '8',
    name: 'Atta (Flour)',
    quantity: '1 kg',
    price: 90,
    picture: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    rating: 4.4,
    reviews: 134,
    deliveryTime: '25 mins',
    tag: 'Fresh',
    isFavorite: false,
    discount: '12%',
    originalPrice: 102
  },
  {
    id: '9',
    name: 'Dal (Lentils)',
    quantity: '1 kg',
    price: 120,
    picture: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    rating: 4.5,
    reviews: 167,
    deliveryTime: '30 mins',
    tag: 'Protein Rich',
    isFavorite: false,
    discount: '10%',
    originalPrice: 133
  },
  {
    id: '10',
    name: 'Biscuits',
    quantity: '10 packs',
    price: 100,
    picture: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
    rating: 4.3,
    reviews: 89,
    deliveryTime: '20 mins',
    tag: 'Snacks',
    isFavorite: false
  },
  {
    id: '11',
    name: 'Sanitary Pads',
    quantity: '10 pieces',
    price: 80,
    picture: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    rating: 4.6,
    reviews: 234,
    deliveryTime: '25 mins',
    tag: 'Personal Care',
    isFavorite: false,
    discount: '20%',
    originalPrice: 100
  },
  {
    id: '12',
    name: 'Toothpaste',
    quantity: '5 tubes',
    price: 100,
    picture: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4.4,
    reviews: 178,
    deliveryTime: '30 mins',
    tag: 'Oral Care',
    isFavorite: false,
    discount: '15%',
    originalPrice: 118
  },
  {
    id: '13',
    name: 'Toothbrush',
    quantity: '10 pieces',
    price: 50,
    picture: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4.2,
    reviews: 67,
    deliveryTime: '20 mins',
    tag: 'Oral Care',
    isFavorite: false
  },
  {
    id: '14',
    name: 'Detergent Powder',
    quantity: '1 kg',
    price: 70,
    picture: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4.3,
    reviews: 112,
    deliveryTime: '25 mins',
    tag: 'Cleaning',
    isFavorite: false,
    discount: '10%',
    originalPrice: 78
  },
  {
    id: '15',
    name: 'Milk (Tetra Pack)',
    quantity: '5 litres',
    price: 300,
    picture: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    rating: 4.7,
    reviews: 289,
    deliveryTime: '35 mins',
    tag: 'Dairy',
    isFavorite: false,
    discount: '5%',
    originalPrice: 316
  },
  {
    id: '16',
    name: 'Blanket',
    quantity: '1 piece',
    price: 250,
    picture: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    rating: 4.5,
    reviews: 156,
    deliveryTime: '45 mins',
    tag: 'Home & Living',
    isFavorite: false,
    discount: '18%',
    originalPrice: 305
  },
  {
    id: '17',
    name: 'Slippers',
    quantity: '5 pairs',
    price: 300,
    picture: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    rating: 4.4,
    reviews: 198,
    deliveryTime: '40 mins',
    tag: 'Footwear',
    isFavorite: false,
    discount: '12%',
    originalPrice: 341
  },
  {
    id: '18',
    name: 'School Notebooks',
    quantity: '10 pieces',
    price: 100,
    picture: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    rating: 4.6,
    reviews: 145,
    deliveryTime: '30 mins',
    tag: 'Education',
    isFavorite: false,
    discount: '15%',
    originalPrice: 118
  },
  {
    id: '19',
    name: 'Pens & Pencils',
    quantity: '20 pieces',
    price: 50,
    picture: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    rating: 4.3,
    reviews: 78,
    deliveryTime: '20 mins',
    tag: 'Education',
    isFavorite: false
  },
  {
    id: '20',
    name: 'Mosquito Repellent',
    quantity: '10 coils',
    price: 60,
    picture: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4.2,
    reviews: 92,
    deliveryTime: '25 mins',
    tag: 'Health',
    isFavorite: false,
    discount: '8%',
    originalPrice: 65
  }
];
