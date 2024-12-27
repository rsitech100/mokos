"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PopupNotification } from "../Popup/Header/Notification/PopupNotification";
import { useOutsideClick } from "@/utils/useOutsideClick";


export function NotificationButton() {
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
                  router.push("/notification");
            } else {
                  setIsPopUpVisible(!isPopUpVisible);
            }
      };


      return (
            <div className="cursor-pointer w-6 h-6" onClick={handleClick}>
                  <Image src="/image/nav/notification-icon.svg" alt="notification-icon" width={24} height={24} className="w-6 h-6 cursor-pointer" />

                  {!isMobile && isPopUpVisible && (
                        <div 
                        ref={popupRef}
                        className="absolute top-[53px] right-[720px] z-50">
                              <PopupNotification />
                        </div>
                  )}

            </div>
      )
}