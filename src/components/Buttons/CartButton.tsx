"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PopupCart } from "../Popup/Header/Cart/PopupCart";
import { useOutsideClick } from "@/utils/useOutsideClick";

export function CartButton() {
      const [isPopUpVisible, setIsPopUpVisible] = useState(false);
      const [isMobile, setIsMobile] = useState(false);
      const popupRef = useRef<HTMLDivElement>(null);
      const router = useRouter();

      // Detect screen size
      useEffect(() => {
            const handleResize = () => {
                  setIsMobile(window.innerWidth <= 768);
            };

            handleResize(); // Set initial state
            window.addEventListener("resize", handleResize);

            return () => {
                  window.removeEventListener("resize", handleResize);
            };
      }, []);

      // Close popup when clicking outside
      useOutsideClick(popupRef, () => setIsPopUpVisible(false));

      const handleClick = () => {
            if (isMobile) {
                  router.push("/cart");
            } else {
                  setIsPopUpVisible(!isPopUpVisible);
            }
      };

      return (
            <div className="relative">
                  <div
                        className="flex items-center justify-center cursor-pointer w-6 h-6"
                        onClick={handleClick}
                  >
                        <Image
                              src="/image/nav/cart.svg"
                              alt="cart-icon"
                              width={24}
                              height={24}
                              className="w-6 h-6"
                        />
                  </div>

                  {!isMobile && isPopUpVisible && (
                        <div
                              ref={popupRef}
                              className="absolute top-6 -left-[500px] z-50"
                        >
                              <PopupCart />
                        </div>
                  )}
            </div>
      );
}
