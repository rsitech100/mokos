"use client";
import { useState } from "react";
import Image from "next/image";
import { NotificationButton } from "@/components/Buttons/NotificationButton";
import { IoIosArrowDown } from "react-icons/io";
import { UserProfile } from "./Profile/UserProfile";
import { PopupMenuProfile } from "@/components/Popup/Header/Profile/PopupMenuProfile";
import { ProfileItems } from "./Profile/ProfileItems";
import { motion } from "framer-motion";

interface ProfileAfterLoginProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MenuAfterLogin({ isOpen, setIsOpen }: ProfileAfterLoginProps) {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  const handleCloseMenu = () => {
    setIsPopUpVisible(false); // Fungsi untuk menutup menu
    setIsOpen(false);
  };

  return (
    <div
      className={`lg:flex flex-row gap-5 justify-start bg-white cursor-pointer ${isOpen ? "items-start flex bg-white h-screen z-50 px-5" : "hidden"
        }`}
    >
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, x: -100 }}  // Mulai dengan opacity 0 dan geser ke kanan
          animate={{ opacity: 1, x: 0 }}    // Animasi menuju opacity penuh dan posisi normal
          exit={{ opacity: 0, x: 100 }}    // Animasi saat keluar, geser ke kiri dan hilang
          transition={{ duration: 0.3 }}     // Durasi animasi 0.3 detik
          className="flex flex-col w-full max-w-[250px] gap-5"
        >
          <UserProfile />
          <div className="border-t-[1px] border-dashed border-neutral-400"></div>
          <div className="flex flex-col">
            <ProfileItems onClose={handleCloseMenu} />
          </div>
        </motion.div>
      ) : (
        <div className="flex items-center">
          <NotificationButton />
          <hr className="bg-neutral-400 w-8 rotate-90 hidden lg:flex" />
          <div
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
                Martin Paes
              </p>
            </div>
            <IoIosArrowDown color="#191717" />
          </div>

          {isPopUpVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}  // Mulai dari bawah dengan opacity 0
              animate={{ opacity: 1, y: 0 }}    // Muncul dengan opacity penuh dan posisi normal
              transition={{ duration: 0.2 }}     // Durasi animasi 0.2 detik
              className="absolute top-[60px] right-[310px] z-50"
            >
              <PopupMenuProfile />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
