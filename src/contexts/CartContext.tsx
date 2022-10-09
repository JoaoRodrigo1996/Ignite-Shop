import { createContext, ReactNode, useState } from "react";

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
}

interface CartContextType {
  cartItems: IProduct[];
  cartTotal: number;
  addToCart: (product: IProduct) => void;
  checkIfItemAlreadyExist: (productId: string) => boolean;
  removeCartItem: (productId: string) => void;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  const cartTotal = cartItems.reduce((total, product) => {
    return total + product.numberPrice;
  }, 0);

  function addToCart(product: IProduct) {
    setCartItems((state) => [...state, product]);
  }

  function removeCartItem(productId: string) {
    setCartItems((state) =>
      state.filter((product) => product.id !== productId)
    );
  }

  function checkIfItemAlreadyExist(productId: string) {
    return cartItems.some((product) => product.id === productId);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        checkIfItemAlreadyExist,
        removeCartItem,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
