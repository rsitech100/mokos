'use client';
import { useState } from "react";
import { InputField } from "@/components/Input/InputField"
import Link from "next/link";

export default function ForgotPasswordPage() {
      const [email, setEmail] = useState<string>("");
      const isValid = email.trim() !== "";

      return (
            <main className="flex flex-col items-center justify-center h-screen">
                  <section className="flex flex-col items-center justify-center max-w-[360px] sm:max-w-[400px] w-full">
                        <div className="rounded-full h-12 w-12 bg-[#D9D9D9]"></div>
                        <h2 className="mt-5 font-bold text-neutral-700 text-lg sm:text-2xl">Lupa Kata Sandi</h2>
                        <p className="text-neutral-600 text-xs sm:text-sm mt-1 max-w-[320px] text-center">
                              Masukkan email kamu untuk menerima link pengaturan ulang kata sandi
                        </p>
                        <form className="w-full mt-3">
                              <InputField
                                    label="Email"
                                    type="text"
                                    placeholder="Masukkan email"
                                    value={email}
                                    onChange={setEmail}
                              />
                              <Link href="/auth/reset-password" passHref>
                              <button disabled={!isValid} className={`w-full p-2 mt-5 rounded-3xl text-sm text-neutral-100 ${isValid ? 'bg-primary-500' : 'bg-neutral-400'}`} >
                                    Berikutnya
                              </button>
                              </Link>

                              {/* Button Back to Page Login */}
                              <div className="text-center mt-5">
                                    <Link href="/auth/login" passHref className="text-primary-500 text-sm font-semibold">Kembali</Link>
                              </div>
                        </form>
                  </section>
            </main >
      )
}