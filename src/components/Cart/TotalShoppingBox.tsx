'use client';
import { useState, useEffect } from 'react';
import { useCartContext } from "@/utils/CartContext";
import Link from 'next/link';

export function TotalShoppingBox() {
      const { calculateTotalPrice, cartItems } = useCartContext();
      const [totalPrice, setTotalPrice] = useState(0);

      useEffect(() => {
            // Log detail cart items
            console.log('Detailed cart items:',
                  cartItems.map(cart => ({
                        cartId: cart.id,
                        products: cart.products.map(p => ({
                              id: p.id,
                              name: p.name,
                              isSelected: p.isSelected,
                              price: p.price,
                              quantity: p.quantity
                        }))
                  }))
            );

            const newTotalPrice = calculateTotalPrice();
            setTotalPrice(newTotalPrice);
      }, [calculateTotalPrice, cartItems]);

      return (
            <div className="flex flex-col gap-6 p-5 rounded-[12px] bg-white shadow-md w-full max-w-[328px] h-fit">
                  <h4 className="text-lg text-neutral-700 font-bold">Total Belanja</h4>
                  <div className="inline-flex justify-between text-sm text-neutral-700">
                        <p>Total</p>
                        <p>Rp{totalPrice.toLocaleString()}</p>
                  </div>
                  <Link href="/checkout" passHref>
                        <button
                              // disabled={totalPrice === 0}
                              className="text-center py-2 text-sm text-neutral-100 bg-neutral-400 w-full rounded-3xl"
                        >
                              Beli
                        </button>
                  </Link>
            </div>
      )
}