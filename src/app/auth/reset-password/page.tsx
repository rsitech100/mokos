"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { InputField } from "@/components/Input/InputField";
import apiService from "@/app/api/api";
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
      const searchParams = useSearchParams();
      const router = useRouter();

      const recoveryCode = searchParams.get("recoverCode") || "";
      const [password, setPassword] = useState("");
      const [confirmationPassword, setConfirmationPassword] = useState("");
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);

      const isValid =
            password.trim() !== "" &&
            confirmationPassword.trim() !== "" &&
            password === confirmationPassword;

      // Toggle password visibility (reusable)
      const toggleVisibility = (type: "password" | "confirm") => {
            if (type === "password") setShowPassword(!showPassword);
            else setShowConfirmPassword(!showConfirmPassword);
      };

      const handleResetPassword = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!isValid) return;

            try {
                  const response = await apiService.post<{ success: boolean; message: string }>(
                        "/v1/auth/update-password",
                        {
                              recoveryCode,
                              newPassword: password,
                        }
                  );

                  if (response.success) {
                        toast.success('Password berhasil direset. Silakan login.');
                        router.push("/auth/login");
                  } else {
                        toast.error('Gagal mengatur ulang password');
                        // throw new Error(response.message || "Gagal mengatur ulang password.");
                  }
            } catch (error : any) {
                  toast.error('Gagal mengatur ulang password', error);
            }
      };

      return (
            <main className="flex flex-col items-center justify-center h-screen">
                  <section className="flex flex-col items-center justify-center max-w-[360px] sm:max-w-[400px] w-full">
                        <div className="rounded-full h-12 w-12 bg-[#D9D9D9]"></div>
                        <h2 className="mt-5 font-bold text-neutral-700 text-lg sm:text-2xl">
                              Atur Ulang Kata Sandi
                        </h2>
                        <p className="text-neutral-600 text-xs sm:text-sm mt-1 max-w-[320px] text-center">
                              Pastikan minimal 8 karakter termasuk angka dan huruf kecil.
                        </p>

                        <form className="w-full mt-3 space-y-5" onSubmit={handleResetPassword}>
                              {/* Input Password */}
                              <InputField
                                    label="Kata Sandi"
                                    type="password"
                                    placeholder="Masukkan Kata Sandi"
                                    value={password}
                                    onChange={setPassword}
                                    showPasswordToggle={true}
                                    togglePassword={() => toggleVisibility("password")}
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
                                    togglePassword={() => toggleVisibility("confirm")}
                                    showPassword={showConfirmPassword}
                              />

                              <button
                                    type="submit"
                                    disabled={!isValid}
                                    className={`w-full p-2 mt-5 rounded-3xl text-sm text-neutral-100 ${isValid ? "bg-primary-500" : "bg-neutral-400"
                                          }`}
                              >
                                    Simpan
                              </button>
                        </form>
                  </section>
            </main>
      );
}
