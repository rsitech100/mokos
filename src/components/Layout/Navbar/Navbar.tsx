import { CartButton } from "@/components/Buttons/CartButton";
import { CategoryButton } from "@/components/Buttons/CategoryButton";
import { LoginButton } from "@/components/Buttons/LoginButton";
import { RegisterButton } from "@/components/Buttons/RegisterButton";
import { SearchButton } from "@/components/Buttons/SearchButton";
import Image from "next/image";

export function Navbar() {
      return (
            <nav className="bg-white shadow-card">
                  <div className="flex flex-row justify-between px-20 py-4 w-full max-w-[1440px] mx-auto">
                        <div className="flex flex-row gap-5">
                              <div className="rounded-full">
                                    <Image src="/image/nav/profile-dummy.svg" alt="profile-dummy" width={48} height={48} />
                              </div>
                              <CategoryButton />
                        </div>
                        <SearchButton />
                        <div className="flex flex-row items-center gap-5">                        
                              <CartButton />
                              <hr className="bg-neutral-400 w-6 rotate-90"/>
                              <LoginButton />
                              <RegisterButton />
                        </div>
                  </div>
            </nav>
      )
}