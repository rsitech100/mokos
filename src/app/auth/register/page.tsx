import { IconLoginRegister } from "@/styles/icon/IconLoginRegister";
import { RegisterComponent } from "@/components/Register/Register";

export default function RegisterPage() {
      return (
            <main className="flex flex-row justify-between items-center bg-white h-screen p-3 overflow-hidden">
                  {/* Left Section with Image */}
                  <IconLoginRegister />
                  {/* Right Section with Image */}
                  <RegisterComponent />
                  </main>
            )
}