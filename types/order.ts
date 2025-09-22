export interface Product {
  _id: string;
  userId: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number;
  image: string[];
  category: string;
  date: number;
  __v: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  _id: string;
}

export interface Address {
  fullName: string;
  area: string;
  city: string;
  state: string;
  phoneNumber: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  address: Address;
  date: number;
  __v: number;
}
