"use client";
import { useState } from "react";
import { usePathname } from "next/navigation"
import Image from "next/image";
import { disableNavWithFooter } from "@/utils/DisableNavWithFooter";
import { CartButton } from "@/components/Buttons/CartButton";
import { CategoryButton } from "@/components/Buttons/CategoryButton";

import { InputSearchAllProduct } from "@/components/Input/InputSearchAllProduct";
import { HamburgerIcon, XIcon } from "./NavbarIcon";
import { MenuBeforeLogin } from "../Menu/MenuBeforeLogin";
import { MenuAfterLogin } from "../Menu/MenuAfterLogin";
import Link from "next/link";

export function Navbar() {
      const path = usePathname()
      const [isOpen, setIsOpen] = useState(false);

      const toggleMenu = () => {
            setIsOpen(!isOpen);
      }

      return (
            <>
                  {!disableNavWithFooter.includes(path) && (
                        <nav className="bg-white shadow-md">
                              <div className="sticky z-50 flex flex-row px-0 lg:px-20 lg:py-4 w-full justify-between max-w-[1440px] mx-auto items-center">
                                    <div className="flex flex-col lg:flex-row w-full justify-around">
                                          <div className="flex flex-row gap-3 lg:gap-0 w-full items-center justify-between shadow-card py-4 lg:py-0 px-5 lg:px-0 lg:shadow-none bg-white">
                                                {/* Logo Profile */}
                                                {!isOpen &&
                                                      <Link href="/" passHref>
                                                            <div className="w-10 sm:w-[48px] sm:h-fit flex items-center justify-center">
                                                                  <Image src="/image/nav/profile-dummy.svg" alt="profile-dummy" width={48} height={48} className="rounded-full w-10 sm:w-[48px] " />
                                                            </div>
                                                      </Link>
                                                }

                                                {/* Title on Mobile */}
                                                <div>
                                                      {isOpen &&
                                                            <h2 className="font-bold text-neutral-700 text-lg">
                                                                  Menu
                                                            </h2>
                                                      }

                                                </div>

                                                {/* Category Button */}
                                                {!isOpen && <CategoryButton />}

                                                {/* Search Button */}
                                                {!isOpen && <InputSearchAllProduct />}
                                                {!isOpen && <CartButton />}
                                                <div className="flex flex-row items-center gap-5">
                                                      <div className="lg:hidden flex items-center justify-center">
                                                            <button onClick={toggleMenu}>
                                                                  {isOpen ? <XIcon className="transition-transform duration-500 transform rotate-180 opacity-100" /> : <HamburgerIcon className="transition-transform duration-500 transform rotate-0 opacity-100" />}
                                                            </button>
                                                      </div>
                                                </div>
                                          </div>
                                          {/* If the user is not logged in, the BeforeLogin menu will be displayed. */}
                                          {/* <MenuBeforeLogin isOpen={isOpen} /> */}
                                          <MenuAfterLogin isOpen={isOpen} setIsOpen={setIsOpen} />
                                    </div>
                              </div>
                        </nav>
                  )}
            </>
      )
}