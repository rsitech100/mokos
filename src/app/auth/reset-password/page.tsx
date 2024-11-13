'use client';
import { useState } from "react";
import { InputField } from "@/components/Input/InputField"
import Link from "next/link";

export default function ResetPasswordPage() {
      const [password, setPassword] = useState<string>("");
      const [confirmationPassword, setConfirmationPassword] = useState<string>("");
      const [showPassword, setShowPassword] = useState<boolean>(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

      const isValid = password.trim() !== "" && confirmationPassword.trim() !== "";

      // Function to toggle the visibility of the password
      const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
      };

      const toggleConfirmPasswordVisibility = () => {
            setShowConfirmPassword(!showConfirmPassword);
      };

      return (
            <main className="flex flex-col items-center justify-center h-screen">
                  <section className="flex flex-col items-center justify-center max-w-[400px] w-full">
                        <div className="rounded-full h-12 w-12 bg-[#D9D9D9]"></div>
                        <h2 className="mt-5 font-bold text-neutral-700 text-2xl">Atur Ulang Kata Sandi</h2>
                        <p className="text-neutral-600 text-sm mt-1 max-w-[320px] text-center">
                              Pastikan minimal 8 karakter termasuk angka dan huruf kecil
                        </p>
                        <form className="w-full mt-3 space-y-5">
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

                              <Link href="/auth/login" passHref>
                                    <button disabled={!isValid} className={`w-full p-2 mt-5 rounded-3xl text-sm text-neutral-100 ${isValid ? 'bg-primary-500' : 'bg-neutral-400'}`} >
                                          Simpan
                                    </button>
                              </Link>
                        </form>
                  </section>
            </main >
      )
}