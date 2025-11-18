"use client";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import apiService from "@/app/api/api";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

interface PopupChangePasswordProps {
      isOpen: boolean;
      onClose: () => void;
}

interface ApiResp {
      success: boolean;
      message?: string;
      data?: unknown;
}

export function PopupChangePassword({ isOpen, onClose }: PopupChangePasswordProps) {
      const [isMobile, setIsMobile] = useState(false);
      const [currentPassword, setCurrentPassword] = useState("");
      const [newPassword, setNewPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [showCurrentPassword, setShowCurrentPassword] = useState(false);
      const [showNewPassword, setShowNewPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [showVerifyPopup, setShowVerifyPopup] = useState(false);

      // Cek apakah tampilan adalah mobile
      useEffect(() => {
            const handleResize = () => {
                  setIsMobile(window.innerWidth <= 768);
            };
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
      }, []);

      // Reset form saat popup dibuka/ditutup
      useEffect(() => {
            if (isOpen) {
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setShowCurrentPassword(false);
                  setShowNewPassword(false);
                  setShowConfirmPassword(false);
            }
      }, [isOpen]);

      if (!isOpen) return null;

      const handleSubmit = async () => {
            // Validasi
            if (!currentPassword || !newPassword || !confirmPassword) {
                  toast.error("Semua field harus diisi");
                  return;
            }

            if (newPassword !== confirmPassword) {
                  toast.error("Password baru dan konfirmasi tidak sama");
                  return;
            }

            if (newPassword.length < 6) {
                  toast.error("Password baru minimal 6 karakter");
                  return;
            }

            setIsSubmitting(true);

            try {
                  const response = await apiService.put<ApiResp>("/v1/user/password", {
                        currentPassword,
                        newPassword,
                  });

                  if (!response.success) {
                        throw new Error(response.message || "Gagal mengubah password");
                  }

                  toast.success("Password berhasil diubah. Silakan verifikasi email Anda.");
                  setShowVerifyPopup(true);
                  onClose();
            } catch (error) {
                  const msg = error instanceof Error ? error.message : "Terjadi kesalahan";
                  toast.error(msg);
            } finally {
                  setIsSubmitting(false);
            }
      };

      return (
            <>
                  {!showVerifyPopup && (
                        <div
                              className={`fixed inset-0 flex items-center justify-center ${isMobile ? "bg-white" : "bg-black bg-opacity-50 px-2"
                                    } z-50`}
                        >
                              <div
                                    className={`${isMobile
                                          ? "w-full h-full flex flex-col justify-between pb-5"
                                          : "bg-white rounded-xl p-5 shadow-md w-[468px]"
                                          }`}
                              >
                                    <div className="flex flex-col">
                                          {/* Header */}
                                          <div className="inline-flex w-full justify-start items-center md:justify-between shadow-md lg:shadow-none p-5 md:p-0 gap-3 md:gap-0">
                                                <div onClick={onClose} className="flex md:hidden cursor-pointer">
                                                      <FaArrowLeft size={14} color="#00000" />
                                                </div>
                                                <h3 className="text-md font-bold mb-0 lg:mb-4 text-center">
                                                      Ubah Kata Sandi
                                                </h3>
                                                <div onClick={onClose} className="hidden md:flex cursor-pointer">
                                                      <IoClose size={24} color="#00000" />
                                                </div>
                                          </div>

                                          {/* Form */}
                                          <div className="flex flex-col gap-4 p-5 md:p-0 mt-4">
                                                {/* Current Password */}
                                                <div className="flex flex-col gap-2">
                                                      <label className="text-sm text-neutral-700 font-bold">
                                                            Kata Sandi Saat Ini
                                                      </label>
                                                      <div className="relative">
                                                            <input
                                                                  type={showCurrentPassword ? "text" : "password"}
                                                                  value={currentPassword}
                                                                  onChange={(e) => setCurrentPassword(e.target.value)}
                                                                  className="w-full p-2 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none pr-10"
                                                                  placeholder="Masukkan kata sandi saat ini"
                                                            />
                                                            <button
                                                                  type="button"
                                                                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
                                                            >
                                                                  {showCurrentPassword ? <FaEyeSlash color="#191717" /> : <FaEye color="#191717" />}
                                                            </button>
                                                      </div>
                                                </div>

                                                {/* New Password */}
                                                <div className="flex flex-col gap-2">
                                                      <label className="text-sm text-neutral-700 font-bold">
                                                            Kata Sandi Baru
                                                      </label>
                                                      <div className="relative">
                                                            <input
                                                                  type={showNewPassword ? "text" : "password"}
                                                                  value={newPassword}
                                                                  onChange={(e) => setNewPassword(e.target.value)}
                                                                  className="w-full p-2 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none pr-10"
                                                                  placeholder="Masukkan kata sandi baru"
                                                            />
                                                            <button
                                                                  type="button"
                                                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
                                                            >
                                                                  {showNewPassword ? <FaEyeSlash color="#191717" /> : <FaEye color="#191717" />}
                                                            </button>
                                                      </div>
                                                      <p className="text-xs text-neutral-500">Minimal 6 karakter</p>
                                                </div>

                                                {/* Confirm Password */}
                                                <div className="flex flex-col gap-2">
                                                      <label className="text-sm text-neutral-700 font-bold">
                                                            Konfirmasi Kata Sandi Baru
                                                      </label>
                                                      <div className="relative">
                                                            <input
                                                                  type={showConfirmPassword ? "text" : "password"}
                                                                  value={confirmPassword}
                                                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                                                  className="w-full p-2 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none pr-10"
                                                                  placeholder="Konfirmasi kata sandi baru"
                                                            />
                                                            <button
                                                                  type="button"
                                                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
                                                            >
                                                                  {showConfirmPassword ? <FaEyeSlash color="#191717" /> : <FaEye color="#191717" />}
                                                            </button>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3 mt-5 px-5 lg:px-0">
                                          <button
                                                onClick={onClose}
                                                className="hidden lg:flex px-10 py-2 bg-transparent rounded-3xl border border-neutral-400 text-neutral-700 font-semibold hover:bg-gray-300 text-sm"
                                          >
                                                Batal
                                          </button>
                                          <button
                                                onClick={handleSubmit}
                                                disabled={isSubmitting}
                                                className={`w-full lg:w-fit px-10 py-2 rounded-3xl text-white font-semibold text-sm ${isSubmitting
                                                      ? "bg-neutral-400 cursor-not-allowed"
                                                      : "bg-primary-500 hover:bg-primary-600"
                                                      }`}
                                          >
                                                {isSubmitting ? "Menyimpan..." : "Simpan"}
                                          </button>
                                    </div>
                              </div>
                        </div>
                  )}
            </>
      );
}
