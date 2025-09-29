"use client";
import { productsDummyData } from "../assets/assets";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type {
  AppContextType,
  AppContextProviderProps,
  Product,
  UserData,
  CartItems,
} from "./types";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";

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

  // Get user information from Clerk
  const { user } = useUser();

  //Get Token from Clerk
  const { getToken } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [userData, setUserData] = useState<UserData | false>(false);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItems>({});

  const fetchProductData = async (): Promise<void> => {
    setProducts(productsDummyData);
  };

  const fetchUserData = useCallback(async (): Promise<void> => {
    //condition to check if user is a seller
    try {
      if (user && user.publicMetadata.role === "seller") {
        setIsSeller(true);
      }
      const token = await getToken();
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
        setCartItems(data.user.cartItems);
      } else {
        toast.error(data.message);
      }
    } catch {
      //  toast.error(data.message);
    }
  }, [user, getToken]);

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
    if (user) {
      fetchUserData();
    }
  }, [fetchUserData, user]);

  const value: AppContextType = {
    user: user ?? null,
    getToken,
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
