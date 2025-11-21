'use client';
import { useCartContext } from "@/context/CartContext";

interface SelectAllBoxProps {
      count: number;
}

export function SelectAllBox({count}: SelectAllBoxProps) {
      const { cartItems, updateProductSelection } = useCartContext();

      // Calculate total items (all products across all carts)
      const totalItems = cartItems.reduce((total, cart) => {
            return total + cart.products.length;
      }, 0);

      // Check if all items are selected
      const allSelected = cartItems.every(cart => 
            cart.products.every(product => product.isSelected)
      );

      const handleSelectAll = (checked: boolean) => {
            cartItems.forEach(cart => {
                  cart.products.forEach(product => {
                        updateProductSelection(cart.id, product.id, checked);
                  });
            });
      };

      return (
            <div className="w-full bg-neutral-100 shadow-md rounded-[12px] p-5 gap-1.5 inline-flex">
                  <input 
                        type="checkbox" 
                        className="w-5 h-5"
                        checked={allSelected && totalItems > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                  <p className="text-xs sm:text-sm text-neutral-700">Pilih Semua
                        (
                        <span className="font-extrabold">
                              {totalItems}
                        </span>
                        )
                  </p>
            </div>
      );
}