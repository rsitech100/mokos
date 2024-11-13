import { IconLoginRegister } from "@/components/Login/IconLoginRegister";
import { RegisterComponent } from "@/components/Register/Register";

export default function RegisterPage() {
      return (
            <main className="flex flex-row justify-between items-center bg-white h-screen px-3 py-16 overflow-hidden">
                  {/* Left Section with Image */}
                  <IconLoginRegister />
                  {/* Right Section with Image */}
                  <RegisterComponent />
                  </main>
            )
}