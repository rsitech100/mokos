"use client";
import { useState } from "react";
import Image from "next/image";
import { NotificationButton } from "@/components/Buttons/NotificationButton";
import { IoIosArrowDown } from "react-icons/io";
import { UserProfile } from "./Profile/UserProfile";
import { PopupMenuProfile } from "@/components/Popup/Header/Profile/PopupMenuProfile";
import { ProfileItems } from "./Profile/ProfileItems";

interface ProfileAfterLoginProps {
  isOpen: boolean;
}

export function MenuAfterLogin({ isOpen }: ProfileAfterLoginProps) {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  return (
    <div
      className={`lg:flex flex-row gap-5 justify-start bg-white cursor-pointer ${
        isOpen ? "items-start flex bg-white h-screen z-50 px-5" : "hidden"
      }`}
    >
      {isOpen ? (
        <div className="flex flex-col w-full max-w-[250px] gap-5">
          <UserProfile />
          <div className="border-t-[1px] border-dashed border-neutral-400"></div>
          <div className="flex flex-col">
            <ProfileItems />
          </div>
        </div>
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
            <div className="absolute top-[85px] right-[310px] z-50">
              <PopupMenuProfile />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
