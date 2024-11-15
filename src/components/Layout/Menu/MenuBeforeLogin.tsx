import { LoginButton } from "@/components/Buttons/LoginButton";
import { RegisterButton } from "@/components/Buttons/RegisterButton";

interface isOpenProps {
      isOpen: boolean;
}
export function MenuBeforeLogin({ isOpen }: isOpenProps) {
      return (
            <div className={`lg:flex flex-row gap-5 items-start lg:items-center bg-white ${isOpen ? 'flex bg-white h-screen z-50 px-5' : 'hidden'}`}>
                  <hr className="bg-neutral-400 w-12 rotate-90 hidden lg:flex" />
                  <LoginButton />
                  <RegisterButton />
            </div>
      )
}