"use client";
import { productsDummyData, userDummyData } from "../assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import type {
  AppContextType,
  AppContextProviderProps,
  Product,
  UserData,
  CartItems,
} from "./types";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "$";
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [userData, setUserData] = useState<UserData | false>(false);
  const [isSeller, setIsSeller] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItems>({});

  const fetchProductData = async (): Promise<void> => {
    setProducts(productsDummyData);
  };

  const fetchUserData = async (): Promise<void> => {
    setUserData(userDummyData);
  };

  const addToCart = async (itemId: string): Promise<void> => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
  };

  const updateCartQuantity = async (
    itemId: string,
    quantity: number
  ): Promise<void> => {
    const cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
  };

  const getCartCount = (): number => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
  };

  const getCartAmount = (): number => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      if (itemInfo && cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const value: AppContextType = {
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
