"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PopupCart } from "../Popup/Header/Cart/PopUpCart";
import { fetchCart } from "@/lib/api/fetch-cart";

export function CartButton() {
      const [isPopUpVisible, setIsPopUpVisible] = useState(false);
      const [isMobile, setIsMobile] = useState(false);
      const [cartCount, setCartCount] = useState(0);
      const [showAnimation, setShowAnimation] = useState(false);
      const router = useRouter();
      const popupRef = useRef<HTMLDivElement>(null);
      const buttonRef = useRef<HTMLDivElement>(null);

      // Detect screen size
      useEffect(() => {
            const handleResize = () => {
                  setIsMobile(window.innerWidth <= 768);
            };

            handleResize();
            window.addEventListener("resize", handleResize);

            return () => {
                  window.removeEventListener("resize", handleResize);
            };
      }, []);

      // Load cart count
      const loadCartCount = async () => {
            try {
                  const response = await fetchCart();
                  if (response.success) {
                        const count = response.data.reduce((total, merchant) => {
                              return total + merchant.productsCart.length;
                        }, 0);
                        setCartCount(count);
                  }
            } catch (error) {
                  console.error('Error loading cart count:', error);
            }
      };

      useEffect(() => {
            loadCartCount();

            // Listen for cart updates
            const handleCartUpdate = () => {
                  loadCartCount();
                  triggerAnimation();
            };

            window.addEventListener('cartUpdated', handleCartUpdate);

            return () => {
                  window.removeEventListener('cartUpdated', handleCartUpdate);
            };
      }, []);

      // Close popup when clicking outside
      useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                  if (
                        isPopUpVisible &&
                        popupRef.current &&
                        buttonRef.current &&
                        !popupRef.current.contains(event.target as Node) &&
                        !buttonRef.current.contains(event.target as Node)
                  ) {
                        setIsPopUpVisible(false);
                  }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                  document.removeEventListener("mousedown", handleClickOutside);
            };
      }, [isPopUpVisible]);

      const triggerAnimation = () => {
            setShowAnimation(true);
            setTimeout(() => setShowAnimation(false), 600);
      };

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
                        ref={buttonRef}
                        className="flex items-center justify-center cursor-pointer w-6 h-6 relative"
                        onClick={handleClick}
                  >
                        <Image
                              src="/image/nav/cart.svg"
                              alt="cart-icon"
                              width={24}
                              height={24}
                              className={`w-6 h-6 transition-transform ${showAnimation ? 'animate-bounce' : ''}`}
                        />
                        {cartCount > 0 && (
                              <div className={`absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center transition-transform ${showAnimation ? 'scale-125' : 'scale-100'}`}>
                                    {cartCount > 99 ? '99+' : cartCount}
                              </div>
                        )}
                  </div>

                  {!isMobile && isPopUpVisible && (
                        <div
                              ref={popupRef}
                              className="absolute right-[520px] top-10 z-50 animate-fade-in"
                        >
                              <PopupCart />
                        </div>
                  )}
            </div>
      );
}
