"use client";
import { useState } from "react";
import { NotificationButton } from "@/components/Buttons/NotificationButton";
import { UserProfile } from "./Profile/UserProfile";
import { ProfileItems } from "./Profile/ProfileItems";
import { motion } from "framer-motion";
import { ButtonProfile } from "@/components/Buttons/ButtonProfile";

interface ProfileAfterLoginProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MenuAfterLogin({ isOpen, setIsOpen }: ProfileAfterLoginProps) {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

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
         
         <ButtonProfile />
        </div>
      )}
    </div>
  );
}
