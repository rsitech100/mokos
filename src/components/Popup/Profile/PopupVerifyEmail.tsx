'use client';
import { useState } from "react";
import Image from "next/image";
import apiService from "@/app/api/api";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

interface PopupVerifyEmailProps {
      isOpen: boolean;
      onClose: () => void;
      requestKey: string;
      email: string;
}

interface VerificationResponse {
      success: boolean;
      message?: string;
}

export function PopupVerifyEmail({ isOpen, onClose, requestKey, email }: PopupVerifyEmailProps) {
      const [otp, setOtp] = useState("");
      const [loading, setLoading] = useState(false);

      if (!isOpen) return null;

      const handleVerify = async () => {
            if (!otp.trim()) {
                  toast.error("Masukkan kode OTP");
                  return;
            }

            setLoading(true);
            try {
                  const response = await apiService.post<VerificationResponse>("/v1/auth/user/verification", {
                        requestKey: requestKey,
                        secretValue: otp,
                  });

                  if (response.success) {
                        toast.success("Email berhasil diverifikasi!");
                        setOtp("");
                        onClose();
                  } else {
                        throw new Error(response.message || "Verifikasi gagal");
                  }
            } catch (error) {
                  const msg = error instanceof Error ? error.message : "Verifikasi gagal";
                  toast.error(msg);
            } finally {
                  setLoading(false);
            }
      };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                  handleVerify();
            }
      };

      return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]" onClick={onClose}>
                  <div
                        className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative"
                        onClick={(e) => e.stopPropagation()}
                  >
                        <button
                              onClick={onClose}
                              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700"
                              aria-label="Close"
                        >
                              <IoClose size={24} color="#191717" />
                        </button>

                        <h2 className="text-xl font-extrabold text-neutral-700 mb-2">Verifikasi Email</h2>
                        <p className="text-sm text-neutral-600 mb-6">
                              Kode OTP telah dikirim ke <span className="font-semibold">{email}</span>. Masukkan kode untuk verifikasi.
                        </p>

                        <div className="flex flex-col gap-4">
                              <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-neutral-700">Kode OTP</label>
                                    <input
                                          type="text"
                                          value={otp}
                                          onChange={(e) => setOtp(e.target.value)}
                                          onKeyDown={handleKeyDown}
                                          placeholder="Masukkan kode OTP"
                                          className="border border-neutral-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                          maxLength={6}
                                          autoFocus
                                    />
                              </div>

                              <button
                                    onClick={handleVerify}
                                    disabled={loading}
                                    className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors ${
                                          loading
                                                ? "bg-neutral-400 text-neutral-600 cursor-not-allowed"
                                                : "bg-primary-500 text-white hover:bg-primary-600"
                                    }`}
                              >
                                    {loading ? "Memverifikasi..." : "Verifikasi"}
                              </button>
                        </div>
                  </div>
            </div>
      );
}
