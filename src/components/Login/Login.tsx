'use client';
import Link from "next/link";
import { useState } from "react";
import { InputField } from "../Input/InputField";
import Image from "next/image";
import { PopupOTP } from "../Popup/Register/PopupOTP";
import apiService from "@/app/api/api";

export function LoginComponent() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [showPassword, setShowPassword] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
      const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [requestKey, setRequestKey] = useState(null);

      const togglePasswordVisibility = () => setShowPassword(!showPassword);
      const isValid = email.trim() !== "" && password.trim() !== "";
      const openPopUp = () => setIsPopupOpen(true);
      const closePopUp = () => setIsPopupOpen(false);

      const handleLogin = async (e: React.FormEvent) => {
            e.preventDefault();
            setIsLoading(true);
            setErrorMessage("");
            try {
                  const response = await apiService.post("/v1/auth/login", { username: email, password });
                  if (!response.success) throw new Error(response.message || "Login failed");

                  const requestKey  = response.data.requestKey;
                  if (!requestKey ) throw new Error("kode OTP tidak ditemukan.");

                  if (requestKey) {
                        setRequestKey(requestKey);
                        openPopUp();
                  } else {
                        alert("Request Key tidak ditemukan!");
                  }
            } catch (error) {
                  setErrorMessage(error.message || "Terjadi kesalahan saat login");
            } finally {
                  setIsLoading(false);
            }
      };

      return (
            <section className="w-full lg:w-1/2 p-5 lg:p-0 h-screen flex flex-col items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                        <div className="rounded-full h-12 w-12 bg-[#D9D9D9]"></div>
                        <h2 className="mt-2 font-bold text-neutral-700 text-lg sm:text-2xl">Masuk</h2>
                        <p className="text-neutral-600 text-xs sm:text-sm mt-1">Silahkan masuk dengan akun yang kamu miliki</p>
                  </div>

                  <form className="flex flex-col w-full max-w-[360px] sm:w-[400px] gap-4" onSubmit={handleLogin}>
                        <InputField label="Email / Nomor HP" type="email" placeholder="Masukkan email atau nomor hp" value={email} onChange={setEmail} />
                        <InputField label="Kata Sandi" type="password" placeholder="Masukkan Kata Sandi" value={password} onChange={setPassword} showPasswordToggle togglePassword={togglePasswordVisibility} showPassword={showPassword} />
                        {errorMessage && <p className="text-red-500 text-xs sm:text-sm">{errorMessage}</p>}
                        <Link href="/auth/forgot-password" className="text-primary-500 font-bold text-xs sm:text-sm -mt-2" passHref>Lupa Password?</Link>
                        <button type="submit" disabled={!isValid || isLoading} className={`w-full p-2 rounded-3xl text-sm text-neutral-100 ${isValid && !isLoading ? 'bg-primary-500' : 'bg-neutral-400'}`}>{isLoading ? "Loading..." : "Masuk"}</button>
                  </form>

                  <div className="flex flex-col text-center w-full max-w-[360px] sm:w-[400px] gap-4">
                        <div className="flex flex-row items-center">
                              <hr className="border-neutral-400 border w-full h-[1px]" />
                              <p className="text-neutral-600 text-xs sm:text-sm w-full px-2 whitespace-nowrap">atau masuk dengan</p>
                              <hr className="border-neutral-400 border w-full" />
                        </div>
                        <button className="flex items-center justify-center gap-2 rounded-3xl border border-neutral-400 text-neutral-700 text-sm p-2">
                              <Image src="/image/login/google-icon.svg" alt="google-icon" width={20} height={20} className="w-5" />
                              Google
                        </button>
                        <p className="text-sm text-neutral-700">Belum punya akun? <Link href="/auth/register" className="text-primary-500 font-semibold">Daftar</Link></p>
                  </div>

                  <PopupOTP isOpen={isPopupOpen} email={email} onClose={closePopUp} requestKey={requestKey} type="login" />
            </section>
      );
}
