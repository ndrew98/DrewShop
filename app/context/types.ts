export interface Product {
  _id: string;
  userId: string; // Changed from userid to userId (matches your dummy data)
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
  date: number;
  __v?: number;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  imageUrl?: string; // Changed from imageURL to imageUrl (matches dummy data)
  cartItems: CartItems; // Changed from cartitems to cartItems
  phone?: string;
  address?: string;
  __v?: number;
}

export interface CartItems {
  [itemId: string]: number;
}

export interface CartItem {
  _id: string;
  size?: string;
  quantity: number;
}

export interface Address {
  _id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  pincode: number;
  area: string;
  city: string;
  state: string;
  __v: number;
}

export interface AppContextType {
  // Core properties
  currency: string;
  router: {
    push: (url: string) => void;
    back: () => void;
    forward: () => void;
    refresh: () => void;
  };
  
  // Products
  products: Product[];
  fetchProductData: () => Promise<void>;
  
  // User data
  userData: UserData | false;
  fetchUserData: () => Promise<void>;
  
  // Seller state
  isSeller: boolean;
  setIsSeller: (isSeller: boolean) => void;
  
  // Cart functionality
  cartItems: CartItems;
  setCartItems: (cartItems: CartItems) => void;
  addToCart: (itemId: string) => Promise<void>;
  updateCartQuantity: (itemId: string, quantity: number) => Promise<void>;
  getCartCount: () => number;
  getCartAmount: () => number;
}

export interface ProductCardProps {
  product: Product;
}

export interface AppContextProviderProps {
  children: React.ReactNode;
}