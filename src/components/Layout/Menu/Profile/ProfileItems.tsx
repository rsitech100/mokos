"use client";
import { useState } from "react";
import { ProfileItem } from "./ProfileItem";
import { LogoutPopup } from "@/components/Popup/Header/Logout/PopupLogout";

const profileItems = [
      { icon: '/image/nav/menu/user.svg', alt: 'profile', title: 'Profil' },
      { icon: '/image/nav/menu/address.svg', alt: 'address', title: 'Daftar Alamat' },
      { icon: '/image/nav/menu/order.svg', alt: 'order', title: 'Daftar Pesanan' },
      { icon: '/image/nav/menu/review.svg', alt: 'review', title: 'Ulasan' },
      { icon: '/image/nav/menu/notification.svg', alt: 'notification', title: 'Notifikasi' },
      { icon: '/image/nav/menu/logout.svg', alt: 'out', title: 'Keluar' },
];

export function ProfileItems() {
      const [showLogoutPopup, setShowLogoutPopup] = useState(false);

      const handleLogoutClick = () => {
            setShowLogoutPopup(true);
      };

      const handleClosePopup = () => {
            setShowLogoutPopup(false);
      };

      return (
            <>
                  {profileItems.map((item) => (
                        <ProfileItem key={item.alt} icon={item.icon} alt={item.alt} title={item.title} onClick={item.title === 'Keluar' ? handleLogoutClick : undefined} />
                  ))}

                  <LogoutPopup
                        isOpen={showLogoutPopup}
                        onClose={handleClosePopup}
                  />
            </>
      )
}
