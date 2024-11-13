import { IconLoginRegister } from "@/components/Login/IconLoginRegister";
import { LoginComponent } from "@/components/Login/Login";

export default function LoginPage() {
      return (
            <main className="flex flex-row justify-between items-center bg-white h-screen px-3 py-16 overflow-hidden">
                  {/* Left Section with Image */}
                  <IconLoginRegister />
                  {/* Right Section with Image */}
                  <LoginComponent />
                  </main>
            )
}