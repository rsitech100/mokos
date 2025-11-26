"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import apiService from "@/app/api/api";
import toast from "react-hot-toast";
import { PopupChangePassword } from "../Popup/Profile/PopupChangePassword";
import { PopupVerifyEmail } from "../Popup/Profile/PopupVerifyEmail";

type ContactInformationType = {
      title: string;
      value: string;
      field: "phone" | "email";
};

interface ApiResp {
      success: boolean;
      message?: string;
      data?: unknown;
}

interface EmailUpdateResponse {
      success: boolean;
      message?: string;
      data?: {
            requestKey: string;
            expired: number;
            refreshTime: number;
      };
}

export function ContactInformation() {
      const { user, updateUser } = useAuth();
      const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
      const [isVerifyEmailOpen, setIsVerifyEmailOpen] = useState<boolean>(false);
      const [emailVerificationData, setEmailVerificationData] = useState<{
            requestKey: string;
            email: string;
      } | null>(null);
      const [editIndex, setEditIndex] = useState<number | null>(null);
      const [saving, setSaving] = useState<number | null>(null);

      // State to store updated values dari user
      const [updatedValues, setUpdatedValues] = useState<ContactInformationType[]>([
            { title: "Nomor HP", value: user?.phone || "", field: "phone" },
            { title: "Email", value: user?.email || "", field: "email" },
      ]);

      // Update state saat user data berubah
      useEffect(() => {
            setUpdatedValues([
                  { title: "Nomor HP", value: user?.phone || "", field: "phone" },
                  { title: "Email", value: user?.email || "", field: "email" },
            ]);
      }, [user]);

      const openPopUp = () => setIsPopupOpen(true);
      const closePopUp = () => setIsPopupOpen(false);

      const handleEditClick = (index: number) => {
            setEditIndex(index);
      };

      const handleInputChange = (index: number, newValue: string) => {
            const newValues = [...updatedValues];
            newValues[index].value = newValue;
            setUpdatedValues(newValues);
      };

      const handleSaveContact = async (index: number) => {
            const item = updatedValues[index];
            setSaving(index);

            try {
                  if (item.field === "phone") {
                        const response = await apiService.put<ApiResp>("/v1/user/phone", {
                              phone: item.value,
                        });
                        if (!response.success) throw new Error(response.message || "Gagal update nomor HP");
                        updateUser({ phone: item.value });
                        toast.success("Nomor HP berhasil diubah");
                        setEditIndex(null);
                  } else if (item.field === "email") {
                        const response = await apiService.put<EmailUpdateResponse>("/v1/user/email", {
                              email: item.value,
                        });
                        if (!response.success) throw new Error(response.message || "Gagal update email");

                        // Check if verification is required
                        if (response.data?.requestKey) {
                              // Store verification data and open popup
                              setEmailVerificationData({
                                    requestKey: response.data.requestKey,
                                    email: item.value,
                              });
                              setIsVerifyEmailOpen(true);
                              toast.success(response.message || "Kode OTP telah dikirim ke email Anda");
                        } else {
                              updateUser({ email: item.value });
                              toast.success("Email berhasil diubah");
                        }
                        setEditIndex(null);
                  }
            } catch (error) {
                  const msg = error instanceof Error ? error.message : "Terjadi kesalahan";
                  toast.error(msg);
                  // Rollback value jika gagal
                  setUpdatedValues([
                        { title: "Nomor HP", value: user?.phone || "", field: "phone" },
                        { title: "Email", value: user?.email || "", field: "email" },
                  ]);
            } finally {
                  setSaving(null);
            }
      };

      const handleInputKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                  handleSaveContact(index);
            } else if (event.key === "Escape") {
                  setEditIndex(null);
                  // Reset ke nilai original
                  setUpdatedValues([
                        { title: "Nomor HP", value: user?.phone || "", field: "phone" },
                        { title: "Email", value: user?.email || "", field: "email" },
                  ]);
            }
      };

      const handleChangePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            openPopUp();
      };

      const handleVerifyEmailClose = () => {
            setIsVerifyEmailOpen(false);
            setEmailVerificationData(null);
            // Update user email in context after successful verification
            if (emailVerificationData?.email) {
                  updateUser({ email: emailVerificationData.email });
            }
      };

      return (
            <div className="flex flex-col gap-5">
                  <h4 className="text-lg font-extrabold text-neutral-700">Kontak</h4>
                  <div className="flex flex-col gap-5">
                        {updatedValues.map((item, index) => (
                              <div
                                    className="flex flex-row text-neutral-700 text-sm gap-[20px] justify-between lg:justify-start"
                                    key={index}
                              >
                                    <p className="w-fit sm:w-[150px]">{item.title}</p>
                                    <div className="flex flex-col md:flex-row gap-3 items-end">
                                          {editIndex === index ? (
                                                <>
                                                      <input
                                                            type={item.field === "email" ? "email" : "text"}
                                                            className="border border-neutral-400 rounded-md px-2 py-1 text-sm"
                                                            value={item.value}
                                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                                            onKeyDown={(e) => handleInputKeyDown(index, e)}
                                                            autoFocus
                                                      />
                                                      <div className="flex flex-row gap-3 justify-end items-center">
                                                            <button
                                                                  onClick={() => handleSaveContact(index)}
                                                                  disabled={saving === index}
                                                                  className={`px-3 py-1 rounded-md text-xs font-semibold text-white ${saving === index ? "bg-neutral-400" : "bg-primary-500 hover:bg-primary-600"
                                                                        }`}
                                                            >
                                                                  {saving === index ? "..." : "Simpan"}
                                                            </button>
                                                            <button
                                                                  onClick={() => {
                                                                        setEditIndex(null);
                                                                        setUpdatedValues([
                                                                              { title: "Nomor HP", value: user?.phone || "", field: "phone" },
                                                                              { title: "Email", value: user?.email || "", field: "email" },
                                                                        ]);
                                                                  }}
                                                                  className="text-neutral-500 text-xs"
                                                            >
                                                                  Batal
                                                            </button>
                                                      </div>

                                                </>
                                          ) : (
                                                <>
                                                      <p className="text-right">{item.value}</p>
                                                      <div
                                                            className="inline-flex gap-2 items-center cursor-pointer"
                                                            onClick={() => handleEditClick(index)}
                                                      >
                                                            <Image
                                                                  src="/image/profile/edit.svg"
                                                                  alt="edit-icon"
                                                                  width={20}
                                                                  height={20}
                                                                  className="w-5"
                                                            />
                                                            <p className="text-sm text-primary-500 font-bold">Ubah</p>
                                                      </div>
                                                </>
                                          )}
                                    </div>
                              </div>
                        ))}
                  </div>
                  <button
                        onClick={handleChangePassword}
                        className="bg-transparent border border-neutral-400 rounded-3xl py-3 w-full lg:w-fit px-10 font-semibold text-sm"
                  >
                        Ubah Kata Sandi
                  </button>

                  <PopupChangePassword isOpen={isPopupOpen} onClose={closePopUp} />

                  {emailVerificationData && (
                        <PopupVerifyEmail
                              isOpen={isVerifyEmailOpen}
                              onClose={handleVerifyEmailClose}
                              requestKey={emailVerificationData.requestKey}
                              email={emailVerificationData.email}
                        />
                  )}
            </div>
      );
}
