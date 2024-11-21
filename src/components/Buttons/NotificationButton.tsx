"use client";
import { useState } from "react";
import Image from "next/image";
import { PopupNotification } from "../Popup/Header/Notification/PopupNotification";

export function NotificationButton() {
      const [isPopUpVisible, setIsPopUpVisible] = useState(false);

      const togglePopUp = () => {
            setIsPopUpVisible(!isPopUpVisible);
      }

      return (
            <div className="cursor-pointer w-6 h-6" onClick={togglePopUp}>
                  <Image src="/image/nav/notification-icon.svg" alt="notification-icon" width={24} height={24} className="w-6 h-6 cursor-pointer" />

                  {isPopUpVisible && (
                        <div className="absolute top-[53px] right-[720px] z-50">
                              <PopupNotification />
                        </div>
                  )}

            </div>
      )
}