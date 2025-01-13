'use client';
import Link from "next/link";
import { useState } from "react";
import { InputField } from "../Input/InputField";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { PopupOTP } from "../Popup/Register/PopupOTP";
import apiService from "@/app/api/api";

export function LoginComponent() {
      // const router = useRouter();
      const [email, setEmail] = useState<string>("");
      const [password, setPassword] = useState<string>("");
      const [showPassword, setShowPassword] = useState<boolean>(false);
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const [errorMessage, setErrorMessage] = useState<string>("");
      const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // State for control the popup
      const [requestKey, setRequestKey] = useState<string | null>(null);

      // Function to toggle the visibility of the password
      const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
      };

      // Check if both fields are filled to enable the button
      const isValid = email.trim() !== "" && password.trim() !== "";

      // Handle login form submission
      const handleLogin = async (e: React.FormEvent) => {
            e.preventDefault();
            setIsLoading(true);
            setErrorMessage("");
            try {
                  const response = await apiService.post<any>("/v1/auth/login", { username: email, password })
                  const responseData = await response.json();
                  const key = responseData?.data?.data?.requestKey; // Akses requestKey dari data.data
                  if (!responseData.success) {
                        throw new Error(responseData.message || "Login failed");
                  }

                  // Login success
                  console.log("Login successful:", responseData.data);
                  console.log("Request Key:", responseData.data.data.requestKey);

                  if (key) {
                        setRequestKey(key);
                        openPopUp();
                  } else {
                        alert("Request Key tidak ditemukan!");
                  }

            } catch (error: unknown) {
                  if (error instanceof Error) {
                        alert(error.message || "Terjadi kesalahan saat login");
                  } else {
                        setErrorMessage("Terjadi kesalahan yang tidak diketahui");
                  }
            } finally {
                  setIsLoading(false);
            }
      };


      // function to open and close the pop up
      const openPopUp = () => setIsPopupOpen(true);
      const closePopUp = () => setIsPopupOpen(false);

      return (
            // Right Section with Form 
            <section className="w-full lg:w-1/2 p-5 lg:p-0 h-screen flex flex-col items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                        <div className="rounded-full h-12 w-12 bg-[#D9D9D9]"></div>
                        <h2 className="mt-2 font-bold text-neutral-700 text-lg sm:text-2xl">Masuk</h2>
                        <p className="text-neutral-600 text-xs sm:text-sm mt-1">
                              Silahkan masuk dengan akun yang kamu miliki
                        </p>
                  </div>

                  <form
                        className="flex flex-col justify-start text-left w-full max-w-[360px] sm:w-[400px] gap-4"
                        onSubmit={handleLogin}
                  >
                        {/* Input Email */}
                        <InputField
                              label="Email / Nomor HP"
                              type="email"
                              placeholder="Masukkan email atau nomor hp"
                              value={email}
                              onChange={setEmail}
                        />

                        {/* Input Password */}
                        <InputField
                              label="Kata Sandi"
                              type="password"
                              placeholder="Masukkan Kata Sandi"
                              value={password}
                              onChange={setPassword}
                              showPasswordToggle={true}
                              togglePassword={togglePasswordVisibility}
                              showPassword={showPassword}
                        />

                        {/* Error Message */}
                        {errorMessage && (
                              <p className="text-red-500 text-xs sm:text-sm">{errorMessage}</p>
                        )}

                        {/* Forgot Password Button */}
                        <Link href="/auth/forgot-password" className="text-primary-500 font-bold text-xs sm:text-sm -mt-2" passHref>Lupa Password?</Link>

                        {/* Submit Button */}
                        <button
                              type="submit"
                              disabled={!isValid || isLoading}
                              className={`w-full p-2 rounded-3xl text-sm text-neutral-100 ${isValid && !isLoading ? 'bg-primary-500' : 'bg-neutral-400'
                                    }`}
                        >
                              {isLoading ? "Loading..." : "Masuk"}
                        </button>
                  </form>

                  <div className="flex flex-col text-center w-full max-w-[360px] sm:w-[400px] gap-4">
                        <div className="flex flex-row text-center items-center">
                              <hr className="border-neutral-400 border w-full h-[1px]" />
                              <p className="text-neutral-600 text-xs sm:text-sm w-full whitespace-nowrap px-2">atau masuk dengan</p>
                              <hr className="border-neutral-400 border w-full" />
                        </div>
                        <button className="flex flex-row w-full items-center justify-center gap-2 rounded-3xl border border-neutral-400 text-neutral-700 text-sm p-2">
                              <Image src="/image/login/google-icon.svg" alt="google-icon" width={20} height={20} className="w-5" />
                              Google
                        </button>
                        <p className="text-sm text-neutral-700">
                              Belum punya akun? <Link href="/auth/register" className="text-primary-500 font-semibold">Daftar</Link>
                        </p>
                  </div>

                  <PopupOTP isOpen={isPopupOpen} email={email} onClose={closePopUp} requestKey={requestKey} />
            </section>
      );
}
