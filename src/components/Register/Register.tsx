'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { InputField } from "../Input/InputField";
import { PopupOTP } from "../Popup/Register/PopupOTP";

// Main RegisterComponent
export function RegisterComponent() {
      const [email, setEmail] = useState<string>("");
      const [password, setPassword] = useState<string>("");
      const [confirmationPassword, setConfirmationPassword] = useState<string>("");
      const [showPassword, setShowPassword] = useState<boolean>(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
      const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // State for control the popup

      // function to open and close the pop up
      const openPopUp = () => setIsPopupOpen(true);
      const closePopUp = () => setIsPopupOpen(false);

      // Function to toggle visibility of the password field
      const togglePasswordVisibility = () => setShowPassword(!showPassword);
      const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

      // Check if all required fields are filled to enable the button
      const isValid = email.trim() !== "" && password.trim() !== "" && confirmationPassword.trim() !== "";

      // function for handle form submission
      const handleRegister = (e: React.FormEvent) => {
            e.preventDefault(); 
            if (isValid) {
                  openPopUp();
            }
      }
      return (
            <section className="w-full lg:w-1/2 p-5 lg:p-0 h-screen flex flex-col items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                        <div className="rounded-full h-12 w-12 bg-[#D9D9D9]"></div>
                        <h2 className="mt-2 font-bold text-neutral-700 text-lg sm:text-2xl">Daftar</h2>
                        <p className="text-neutral-600 text-xs sm:text-sm mt-1">Silahkan melakukan pendaftaran</p>
                  </div>

                  <form className="flex flex-col justify-start text-left w-full max-w-[360px] sm:w-[400px] gap-4" onSubmit={handleRegister}>
                        {/* Input Email */}
                        <InputField
                              label="Email / Nomor HP"
                              type="text"
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

                        {/* Input Konfirmasi Password */}
                        <InputField
                              label="Konfirmasi Kata Sandi"
                              type="password"
                              placeholder="Masukkan konfirmasi kata sandi"
                              value={confirmationPassword}
                              onChange={setConfirmationPassword}
                              showPasswordToggle={true}
                              togglePassword={toggleConfirmPasswordVisibility}
                              showPassword={showConfirmPassword}
                        />

                        {/* Submit Button */}
                        <button
                              type="submit"
                              disabled={!isValid}
                              className={`w-full p-2 rounded-3xl text-sm text-neutral-100 ${isValid ? 'bg-primary-500' : 'bg-neutral-400'}`}
                        >
                              Daftar
                        </button>
                  </form>

                  <div className="flex flex-col text-center w-full max-w-[360px] sm:w-[400px] gap-4">
                        <div className="flex items-center">
                        <hr className="border-neutral-400 border w-full h-[1px]" />
                              <p className="text-neutral-600 text-xs sm:text-sm w-full whitespace-nowrap px-2">atau daftar dengan</p>
                              <hr className="border-neutral-400 border w-full" />
                        </div>
                        <button className="flex items-center justify-center gap-2 rounded-3xl border border-neutral-400 text-neutral-700 text-sm p-2">
                              <Image src="/image/login/google-icon.svg" alt="google-icon" width={20} height={20} className="w-5" />
                              Google
                        </button>
                        <p className="text-sm text-neutral-700">
                              Sudah punya akun? <Link href="/auth/login" className="text-primary-500 font-semibold">Masuk</Link>
                        </p>
                  </div>

                  <PopupOTP isOpen={isPopupOpen} onClose={closePopUp} />                  
            </section>
      );
}