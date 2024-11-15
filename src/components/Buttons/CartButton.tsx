import Image from "next/image";

export function CartButton() {
      return (
            <div className="cursor-pointer w-6 h-6">
                  <Image src="/image/nav/cart.svg" alt="cart-icon" width={24} height={24} className="w-6 h-6"/>
            </div>
      )
}