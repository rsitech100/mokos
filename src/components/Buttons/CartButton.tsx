"use client";
import { useState } from "react";
import Image from "next/image";
import { PopupCart } from "../Popup/Header/Cart/PopUpCart";

export function CartButton() {
      const [isPopUpVisible, setIsPopUpVisible] = useState(false);

      const togglePopUp = () => {
            setIsPopUpVisible(!isPopUpVisible);
      }

      return (
            <div className="relative cursor-pointer w-6 h-6" onClick={togglePopUp}>
                  <Image src="/image/nav/cart.svg" alt="cart-icon" width={24} height={24} className="w-6 h-6" />

                  {isPopUpVisible && (
                        <div className="absolute top-6 -left-[420px] z-50">
                              <PopupCart />
                        </div>
                  )}
            </div>
      );
}