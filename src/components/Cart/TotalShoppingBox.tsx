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
            <div className="fixed bottom-0 lg:static flex flex-row justify-between items-center lg:items-start lg:flex-col gap-0 lg:gap-6 p-5 rounded-none md:rounded-[12px] bg-white shadow-none md:shadow-md w-full lg:max-w-[328px] z-50 h-fit">
                  <div className="flex flex-col gap-1 w-full">
                        <h4 className="text-xs lg:text-lg text-neutral-700 font-normal lg:font-bold">Total Belanja</h4>
                        <div className="inline-flex gap-1 justify-between text-sm text-neutral-700 w-full">
                              <p className="hidden lg:block">Total</p>
                              <p className="text-base font-extrabold lg:text-sm lg:font-normal">Rp{totalPrice.toLocaleString()}</p>
                        </div>
                  </div>
                  <Link href="/checkout" className="w-full" passHref>
                        <button
                              disabled={totalPrice === 0}
                              className={`text-center py-2 text-sm text-neutral-100 w-full rounded-3xl
                                    ${totalPrice === 0 ? 'bg-neutral-400' : 'bg-primary-500 text-neutral-100'}
                                    `}
                        >
                              Beli
                        </button>
                  </Link>
            </div>
      )
}