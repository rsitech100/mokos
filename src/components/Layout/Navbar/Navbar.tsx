"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { disableNavWithFooter } from "@/utils/disableNavWithFooter";
import { CartButton } from "@/components/Buttons/CartButton";
import { CategoryButton } from "@/components/Buttons/CategoryButton";
import { useAuth } from "@/context/AuthContext";
import { InputSearchAllProduct } from "@/components/Input/InputSearchAllProduct";
import { HamburgerIcon, XIcon } from "./NavbarIcon";
import { MenuBeforeLogin } from "../Menu/MenuBeforeLogin";
import { MenuAfterLogin } from "../Menu/MenuAfterLogin";
import Link from "next/link";

export function Navbar() {
      const path = usePathname();
      const [isOpen, setIsOpen] = useState(false);
      const { isAuthenticated, user, token } = useAuth();

      useEffect(() => {
      }, [isAuthenticated, token, user]);

      const toggleMenu = () => {
            setIsOpen(!isOpen);
      };

      return (
            <>
                  {!disableNavWithFooter.includes(path) && (
                        <nav className="shadow-card z-50">
                              <div className="sticky z-50 flex flex-row px-0 lg:px-20 lg:py-4 w-full justify-between max-w-[1440px] mx-auto items-center">
                                    <div className="flex flex-col lg:flex-row w-full justify-around">
                                          <div className="flex flex-row gap-3 lg:gap-0 w-full items-center justify-between shadow-card py-4 lg:py-0 px-5 lg:px-0 lg:shadow-none bg-white">
                                                {/* Logo Profile */}
                                                {!isOpen && (
                                                      <Link href="/" passHref>
                                                            <div className="w-10 sm:w-[48px] sm:h-fit flex items-center justify-center">
                                                                  <Image
                                                                        src={
                                                                              user?.profilePhoto
                                                                                    ? (typeof user.profilePhoto === 'object' && user.profilePhoto.uri
                                                                                          ? `${process.env.NEXT_PUBLIC_BASE_API}${user.profilePhoto.uri}`
                                                                                          : typeof user.profilePhoto === 'string' && user.profilePhoto !== ""
                                                                                                ? (user.profilePhoto.startsWith('http') 
                                                                                                      ? user.profilePhoto 
                                                                                                      : `${process.env.NEXT_PUBLIC_BASE_API}/v1/file/${user.profilePhoto}`)
                                                                                                : "/image/nav/profile-dummy.svg")
                                                                                    : "/image/nav/profile-dummy.svg"
                                                                        }
                                                                        alt="profile"
                                                                        width={48}
                                                                        height={48}
                                                                        className="rounded-full w-10 sm:w-[48px] h-10 sm:h-[48px] object-cover"
                                                                        unoptimized={user?.profilePhoto && user.profilePhoto !== "" ? true : false}
                                                                  />
                                                            </div>
                                                      </Link>
                                                )}

                                                {/* Title on Mobile */}
                                                {isOpen && <h2 className="font-bold text-neutral-700 text-lg">Menu</h2>}

                                                {/* Category Button */}
                                                {!isOpen && <CategoryButton />}

                                                {/* Search Button */}
                                                {!isOpen && <InputSearchAllProduct />}
                                                {!isOpen && <CartButton />}
                                                <div className="flex flex-row items-center gap-5">
                                                      <div className="lg:hidden flex items-center justify-center">
                                                            <button onClick={toggleMenu}>
                                                                  {isOpen ? (
                                                                        <XIcon className="transition-transform duration-500 transform rotate-180 opacity-100" />
                                                                  ) : (
                                                                        <HamburgerIcon className="transition-transform duration-500 transform rotate-0 opacity-100" />
                                                                  )}
                                                            </button>
                                                      </div>
                                                </div>
                                          </div>

                                          {/* Menu */}
                                          {isAuthenticated ? (
                                                <MenuAfterLogin isOpen={isOpen} setIsOpen={setIsOpen} />
) : (
                                                <MenuBeforeLogin isOpen={isOpen} />
                                          )}
                                    </div>
                              </div>
                        </nav>
                  )}
            </>
      );
}
