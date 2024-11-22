import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { ProfileItem } from "./ProfileItem";
import { LogoutPopup } from "@/components/Popup/Header/Logout/PopupLogout";
import { useState } from "react";

const profileItems = [
      { icon: '/image/nav/menu/user.svg', alt: 'profile', title: 'Profil', href: '/profile' },
      { icon: '/image/nav/menu/address.svg', alt: 'address', title: 'Daftar Alamat', href: '/address' },
      { icon: '/image/nav/menu/order.svg', alt: 'order', title: 'Daftar Pesanan', href: '/order' },
      { icon: '/image/nav/menu/review.svg', alt: 'review', title: 'Ulasan', href: '/review' },
      { icon: '/image/nav/menu/notification.svg', alt: 'notification', title: 'Notifikasi', href: '/notification' },
      { icon: '/image/nav/menu/logout.svg', alt: 'out', title: 'Keluar', href: '/logout' },
];

export function ProfileItems() {
      const pathname = usePathname(); // Get current path
      const [showLogoutPopup, setShowLogoutPopup] = useState(false);

      const handleLogoutClick = () => setShowLogoutPopup(true);
      const handleClosePopup = () => setShowLogoutPopup(false);

      return (
            <>
                  {profileItems.map((item) => {
                        const isActive = pathname === item.href; // Compare current path with item.href
                        return (
                              <Link href={item.href} key={item.alt} passHref>
                                    <ProfileItem
                                          icon={item.icon}
                                          alt={item.alt}
                                          title={item.title}
                                          onClick={item.title === "Keluar" ? handleLogoutClick : undefined}
                                          isActive={isActive} // Pass active state to ProfileItem
                                    />
                              </Link>
                        );
                  })}
                  <LogoutPopup isOpen={showLogoutPopup} onClose={handleClosePopup} />
            </>
      );
}
