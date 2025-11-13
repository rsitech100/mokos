"use client";
import { useState, useRef } from "react";
import { useOutsideClick } from "@/utils/useOutsideClick";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { PopupMenuProfile } from "@/components/Popup/Header/Profile/PopupMenuProfile";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export function ButtonProfile() {
      const [isPopUpVisible, setIsPopUpVisible] = useState(false);
      const popupRef = useRef<HTMLDivElement>(null);
      const { user } = useAuth();

      const togglePopUp = () => {
            setIsPopUpVisible(!isPopUpVisible);
      };

      useOutsideClick(popupRef, () => setIsPopUpVisible(false));

      return (
            <>
                  <button
                        className="bg-transparent border border-neutral-400 p-2 flex flex-row gap-14 items-center justify-between rounded-3xl"
                        onClick={togglePopUp}
                  >
                        <div className="flex flex-row gap-1">
                              <Image
                                    src="/image/nav/user-icon.svg"
                                    alt="user-icon"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5"
                              />
                              <p className="text-sm font-semibold text-neutral-700 whitespace-nowrap">
                                    {user?.fullName || "Guest"}
                              </p>
                        </div>
                        <IoIosArrowDown color="#191717" />
                  </button>

                  {isPopUpVisible && (
                        <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-[60px] right-[310px] z-50"
                              ref={popupRef}
                        >
                              <PopupMenuProfile />
                        </motion.div>
                  )}
            </>
      )
}