'use client';

import React, {
      createContext,
      useState,
      useContext,
      ReactNode,
      useCallback
} from 'react';
import { CartItem, Product } from '@/types/cart';

// Extended interface to track selection state
interface SelectableCartItem extends CartItem {
      products: SelectableProduct[];
}

interface SelectableProduct extends Product {
      isSelected: boolean;
}

// Context type
interface CartContextType {
      cartItems: SelectableCartItem[];
      setCartItems: React.Dispatch<React.SetStateAction<SelectableCartItem[]>>;
      updateProductSelection: (cartId: number, productId: number, isSelected: boolean) => void;
      calculateTotalPrice: () => number;
      updateProductQuantity: (cartId: number, productId: number, newQuantity: number) => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Context Provider Component
export function CartProvider({
      initialCartItems,
      children
}: {
      initialCartItems: CartItem[],
      children: ReactNode
}) {
      // Transform initial cart items to include selection state
      const [cartItems, setCartItems] = useState<SelectableCartItem[]>(
            initialCartItems.map(cart => ({
                  ...cart,
                  products: cart.products.map(product => ({
                        ...product,
                        isSelected: false  // Explicitly set isSelected to false
                  }))
            }))
      );

      // Toggle product selection within a cart
      const updateProductSelection = (cartId: number, productId: number, isSelected: boolean) => {
            setCartItems(prev =>
                  prev.map(cart =>
                        cart.id === cartId
                              ? {
                                    ...cart,
                                    products: cart.products.map(product =>
                                          product.id === productId
                                                ? { ...product, isSelected }
                                                : product
                                    )
                              }
                              : cart
                  )
            );
      };

      // Calculate total price of selected products across all carts
      const calculateTotalPrice = useCallback(() => {
            console.log('Calculating total price, cart items:', cartItems);
            const total = cartItems.reduce((totalPrice, cart) => {
                  const cartTotal = cart.products
                        .filter(product => product.isSelected)
                        .reduce((cartTotal, product) => {
                              console.log('Selected product:', product);
                              return cartTotal + (product.price * product.quantity);
                        }, 0);
                  return totalPrice + cartTotal;
            }, 0);

            console.log('Calculated total:', total);
            return total;
      }, [cartItems]);

      // Update product quantity
      const updateProductQuantity = (cartId: number, productId: number, newQuantity: number) => {
            setCartItems(prevCartItems =>
                  prevCartItems.map(cart => {
                        if (cart.id === cartId) {
                              return {
                                    ...cart,
                                    products: cart.products.map(product =>
                                          product.id === productId
                                                ? { ...product, quantity: Math.max(1, newQuantity) }
                                                : product
                                    )
                              };
                        }
                        return cart;
                  })
            );
      };

      return (
            <CartContext.Provider
                  value={{
                        cartItems,
                        setCartItems,
                        updateProductSelection,
                        calculateTotalPrice,
                        updateProductQuantity
                  }}
            >
                  {children}
            </CartContext.Provider>
      );
}

// Custom hook to use the cart context
export function useCartContext() {
      const context = useContext(CartContext);
      if (context === undefined) {
            throw new Error('useCartContext must be used within a CartProvider');
      }
      return context;
}