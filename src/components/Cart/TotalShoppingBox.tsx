'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartContext } from "@/context/CartContext";
import { createCheckout } from "@/lib/api/fetch-checkout";
import toast from 'react-hot-toast';

export function TotalShoppingBox() {
      const { calculateTotalPrice, cartItems } = useCartContext();
      const [totalPrice, setTotalPrice] = useState(0);
      const [loading, setLoading] = useState(false);
      const router = useRouter();

      useEffect(() => {
            const newTotalPrice = calculateTotalPrice();
            setTotalPrice(newTotalPrice);
      }, [calculateTotalPrice, cartItems]);

      const handleCheckout = async () => {
            // Get selected cart IDs
            const selectedCartIds = cartItems.flatMap(cart => 
                  cart.products
                        .filter(p => p.isSelected && p.cartItemId)
                        .map(p => p.cartItemId!)
            );

            if (selectedCartIds.length === 0) {
                  toast.error('Pilih produk terlebih dahulu');
                  return;
            }

            setLoading(true);
            try {
                  console.log('Waiting for cart updates to complete...');
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  
                  console.log('Creating checkout with cart IDs:', selectedCartIds);
                  
                  const response = await createCheckout({
                        cartsId: selectedCartIds
                  });

                  if (response.success) {
                        router.push(`/checkout?id=${response.data.checkoutGroupId}`);
                  } else {
                        throw new Error(response.message || 'Gagal membuat checkout');
                  }
            } catch (error: unknown) {
                  console.error('Checkout error:', error);
                  
                  if (error instanceof Error && (error.message.includes('Invalid Token') || error.message.includes('401'))) {
                        toast.error('Silakan login terlebih dahulu');
                        router.push('/auth/login');
                        return;
                  }
                  
                  toast.error(error instanceof Error ? error.message : 'Gagal membuat checkout');
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="fixed bottom-0 lg:static flex flex-row justify-between items-center lg:items-start lg:flex-col gap-0 lg:gap-6 p-5 rounded-none md:rounded-[12px] bg-white shadow-none md:shadow-md w-full lg:max-w-[328px] z-50 lg:z-20 h-fit">
                  <div className="flex flex-col gap-1 w-full">
                        <h4 className="text-xs lg:text-lg text-neutral-700 font-normal lg:font-bold">Total Belanja</h4>
                        <div className="inline-flex gap-1 justify-between text-sm text-neutral-700 w-full">
                              <p className="hidden lg:block">Total</p>
                              <p className="text-base font-extrabold lg:text-sm lg:font-normal">Rp{totalPrice.toLocaleString()}</p>
                        </div>
                  </div>
                  <button
                        onClick={handleCheckout}
                        disabled={totalPrice === 0 || loading}
                        className={`text-center py-2 text-sm w-full rounded-3xl transition-colors
                              ${totalPrice === 0 || loading ? 'bg-neutral-400 text-neutral-100' : 'bg-primary-500 text-neutral-100 hover:bg-primary-600'}
                              `}
                  >
                        {loading ? 'Memproses...' : 'Beli'}
                  </button>
            </div>
      )
}