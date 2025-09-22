export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string[];
  price: number;
  offerPrice: number;
  category: string;
  subCategory?: string;
  sizes?: string[];
  rating?: number;
  bestseller?: boolean;
  date?: number;
}

export interface AppContextType {
  currency: string;
  router: {
    push: (url: string) => void;
    back: () => void;
    forward: () => void;
    refresh: () => void;
  };
  // Add other context properties here
  cartItems?: CartItem[];
  addToCart?: (productId: string, size?: string) => void;
  removeFromCart?: (productId: string, size?: string) => void;
}

export interface CartItem {
  _id: string;
  size?: string;
  quantity: number;
}

export interface ProductCardProps {
  product: Product;
}
