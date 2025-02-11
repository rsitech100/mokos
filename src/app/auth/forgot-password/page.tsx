"use client";
import { useState } from "react";
import Link from "next/link";
import apiService from "@/app/api/api";
import { InputField } from "@/components/Input/InputField";
import { PopupOTP } from "@/components/Popup/Register/PopupOTP";

export default function ForgotPasswordPage() {
      const [email, setEmail] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
      const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [requestKey, setRequestKey] = useState(null);


      const isValid = email.trim() !== "";
      const openPopUp = () => setIsPopupOpen(true);
      const closePopUp = () => setIsPopupOpen(false);


      const handleForgotPassword = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!isValid) return;

            setIsLoading(true);
            setErrorMessage("");

            try {
                  const response = await apiService.post("/v1/auth/forgot-password", { email });
                  const requestKey = response.data.requestKey;

                  if (requestKey) {
                        setRequestKey(requestKey);
                        openPopUp();
                  } else {
                        setErrorMessage("Terjadi kesalahan, silakan coba lagi.");
                  }
            } catch (error) {
                  setErrorMessage("Gagal mengirim permintaan, periksa email Anda.");
            } finally {
                  setIsLoading(false);
            }
      };

      return (
            <main className="flex flex-col items-center justify-center h-screen">
                  <section className="flex flex-col items-center justify-center max-w-[400px] w-full p-6">
                        <div className="rounded-full h-12 w-12 bg-gray-300"></div>
                        <h2 className="mt-5 font-bold text-neutral-700 text-2xl">Lupa Kata Sandi</h2>
                        <p className="text-neutral-600 text-sm mt-1 text-center max-w-[320px]">
                              Masukkan email kamu untuk menerima link pengaturan ulang kata sandi
                        </p>

                        <form className="w-full mt-4" onSubmit={handleForgotPassword}>
                              <InputField
                                    label="Email"
                                    type="email"
                                    placeholder="Masukkan email"
                                    value={email}
                                    onChange={setEmail}
                              />

                              {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

                              <button
                                    type="submit"
                                    disabled={!isValid || isLoading}
                                    className={`w-full p-2 mt-5 rounded-3xl text-sm text-white ${isValid ? "bg-primary-500 hover:bg-primary-600" : "bg-neutral-400"
                                          }`}
                              >
                                    {isLoading ? "Mengirim..." : "Berikutnya"}
                              </button>
                        </form>

                        {/* Button Back to Login Page */}
                        <div className="text-center mt-5">
                              <Link href="/auth/login" className="text-primary-500 text-sm font-semibold">
                                    Kembali
                              </Link>
                        </div>


                        <PopupOTP isOpen={isPopupOpen} email={email} onClose={closePopUp} requestKey={requestKey} type="forgot-password" />
                  </section>
            </main>
      );
}
