"use client";
import { useState } from "react";
import { CartButton } from "@/components/Buttons/CartButton";
import { CategoryButton } from "@/components/Buttons/CategoryButton";
import { LoginButton } from "@/components/Buttons/LoginButton";
import { RegisterButton } from "@/components/Buttons/RegisterButton";
import { SearchButton } from "@/components/Buttons/SearchButton";
import Image from "next/image";
import { HamburgerIcon, XIcon } from "./NavbarIcon";

export function Navbar() {
      const [isOpen, setIsOpen] = useState(false);

      const toggleMenu = () => {
            setIsOpen(!isOpen);
      }

      return (
            <nav className="bg-white shadow-card">
                  <div className="flex flex-row px-0 lg:px-20 lg:py-4 w-full justify-between max-w-[1440px] mx-auto items-center">
                        <div className="flex flex-col lg:flex-row gap-5 w-full justify-around">
                              <div className="flex flex-row gap-5 w-full justify-between shadow-card py-4 px-5 lg:shadow-none">
                                    {/* Logo Profile */}
                                    {!isOpen &&
                                          <div className="w-16 sm:w-[48px] sm:h-fit flex items-center justify-center">
                                                <Image src="/image/nav/profile-dummy.svg" alt="profile-dummy" width={48} height={48} className="rounded-full w-[40px] sm:w-[48px] " />
                                          </div>
                                    }

                                    {/* Title on Mobile */}
                                    {isOpen && 
                                    <h2 className="font-bold text-neutral-700 text-lg">
                                          Menu
                                    </h2>
                                    }
                                    {/* Category Button */}
                                    {!isOpen && <CategoryButton />}

                                    {/* Search Button */}
                                    {!isOpen && <SearchButton />}
                                    <div className="flex flex-row items-center gap-5">
                                          {!isOpen && <CartButton />}
                                          <div className="lg:hidden flex items-center justify-center">
                                                <button onClick={toggleMenu}>
                                                      {isOpen ? <XIcon className="transition-transform duration-300 transform rotate-180 opacity-100" /> : <HamburgerIcon className="transition-transform duration-300 transform rotate-0 opacity-100" />}
                                                </button>
                                          </div>
                                          <hr className="bg-neutral-400 w-6 rotate-90 hidden lg:flex" />
                                    </div>
                              </div>
                              <div className={`lg:flex flex-row gap-5 items-start lg:items-center bg-white ${isOpen ? 'flex bg-white h-screen z-50 px-5' : 'hidden'}`}>
                                    <LoginButton />
                                    <RegisterButton />
                              </div>
                        </div>
                  </div>
            </nav>
      )
}