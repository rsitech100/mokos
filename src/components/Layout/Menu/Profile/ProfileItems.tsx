import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { ProfileItem } from "./ProfileItem";
import { LogoutPopup } from "@/components/Popup/Header/Logout/PopupLogout";
import { useState } from "react";


type profileItemsType = {
      icon: string;
      alt: string;
      title: string;
      href?: string;
}

const profileItems: profileItemsType[] = [
      { icon: '/image/nav/menu/user.svg', alt: 'profile', title: 'Profil', href: '/profile' },
      { icon: '/image/nav/menu/address.svg', alt: 'address', title: 'Daftar Alamat', href: '/address' },
      { icon: '/image/nav/menu/order.svg', alt: 'order', title: 'Daftar Pesanan', href: '/order' },
      { icon: '/image/nav/menu/review.svg', alt: 'review', title: 'Ulasan', href: '/review' },
      { icon: '/image/nav/menu/notification.svg', alt: 'notification', title: 'Notifikasi', href: '/notification' },
      { icon: '/image/nav/menu/logout.svg', alt: 'out', title: 'Keluar', href: '' },
];

interface ProfileItemsProps {
      onClose: () => void;
}

export function ProfileItems({ onClose }: ProfileItemsProps) {
      const pathname = usePathname(); // Get current path
      const [showLogoutPopup, setShowLogoutPopup] = useState(false);

      const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault(); // Mencegah navigasi default
            setShowLogoutPopup(true);
      };

      const handleClosePopup = () => setShowLogoutPopup(false);

      return (
            <>
                  {profileItems.map((item) => {
                        const isActive = pathname === item.href; // Compare current path with item.href
                        return (
                              <Link
                                    href={item.href || "#"} // Tambahkan fallback href jika kosong
                                    key={item.alt}
                                    passHref
                                    onClick={(e) => {
                                          if (item.title === "Keluar") {
                                                e.preventDefault(); // Cegah navigasi untuk item logout
                                                handleLogoutClick(e);
                                          } else {
                                                onClose(); 
                                          }
                                    }}
                              >
                                    <ProfileItem
                                          icon={item.icon}
                                          alt={item.alt}
                                          title={item.title}
                                          isActive={isActive} // Pass active state to ProfileItem
                                    />
                              </Link>
                        );
                  })}
                  {showLogoutPopup && (
                        <LogoutPopup onClose={handleClosePopup} />
                  )}
            </>
      );
}
