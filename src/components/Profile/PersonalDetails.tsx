"use client";
import { useState } from "react";
import Image from "next/image";
import { PopupPersonalDetails } from "../Popup/Profile/PopupPersonalDetails";
import { useAuth } from "@/context/AuthContext";
import apiService from "@/app/api/api";
import toast from "react-hot-toast";

interface ApiResp {
      success: boolean;
      message?: string;
      data?: unknown;
}

export function PersonalDetails() {
      const { user, updateUser } = useAuth();

      const convertGender = (g?: string) => {
            if (!g) return "";
            const lower = g.toLowerCase();
            if (["m", "male", "laki-laki"].includes(lower)) return "m";
            if (["f", "female", "perempuan"].includes(lower)) return "f";
            return ""; // unknown
      };

      const [details, setDetails] = useState({
            name: user?.fullName || "",
            dob: user?.dob || "",
            gender: convertGender(user?.gender) || "",
      });

      const [showPopup, setShowPopup] = useState(false);
      const [saving, setSaving] = useState(false);

      // ==========================
      // Helper: Format Tanggal
      // ==========================
      const formatDateForDisplay = (dateStr: string) => {
            if (!dateStr) return "";
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return dateStr;

            return d.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
            });
      };

      // ==========================
      // Helper: Gender mapping
      // ==========================
      const displayGender = (g: string) => {
            if (g === "m") return "Laki-laki";
            if (g === "f") return "Perempuan";
            return "-";
      };

      // ==========================
      // SAVE Handler
      // ==========================
      const normalizeGender = (g: string) => {
            if (g === "m" || g === "f") return g;
            const lower = g.toLowerCase();
            if (["laki-laki", "male"].includes(lower)) return "m";
            if (["perempuan", "female"].includes(lower)) return "f";
            return "";
      };

      const handleSave = async (updatedData: typeof details) => {
            setSaving(true);

            try {
                  const backendDate = updatedData.dob;
                  const backendGender = normalizeGender(updatedData.gender);

                  if (!backendGender) throw new Error("Gender tidak valid. Pilih salah satu.");

                  const response = await apiService.put<ApiResp>("/v1/user/profile", {
                        fullName: updatedData.name,
                        dob: backendDate,
                        gender: backendGender,
                  });


                  if (!response.success) throw new Error(response.message || "Gagal menyimpan profil");

                  setDetails({
                        name: updatedData.name,
                        dob: updatedData.dob,
                        gender: backendGender,
                  });

                  updateUser({
                        fullName: updatedData.name,
                        dob: updatedData.dob,
                        gender: backendGender,
                  });

                  toast.success("Profil berhasil disimpan");
                  setShowPopup(false);

            } catch (err) {
                  const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan profil";
                  toast.error(msg);
            } finally {
                  setSaving(false);
            }
      };

      return (
            <div className="flex flex-col gap-5">
                  {/* Header */}
                  <div className="inline-flex gap-4">
                        <h4 className="text-lg font-extrabold text-neutral-700">Biodata Diri</h4>

                        <div
                              className="inline-flex gap-2 items-center cursor-pointer"
                              onClick={() => setShowPopup(true)}
                        >
                              <Image
                                    src="/image/profile/edit.svg"
                                    alt="edit-icon"
                                    width={20}
                                    height={20}
                              />
                              <div className="text-sm text-primary-500 font-bold">Ubah</div>
                        </div>
                  </div>

                  {/* Data List */}
                  <div className="flex flex-col gap-5">
                        <div className="flex flex-row text-neutral-700 text-sm gap-[20px]">
                              <p className="w-[150px]">Nama</p>
                              <p>{details.name || "-"}</p>
                        </div>

                        <div className="flex flex-row text-neutral-700 text-sm gap-[20px]">
                              <p className="w-[150px]">Tanggal Lahir</p>
                              <p>{formatDateForDisplay(details.dob)}</p>
                        </div>

                        <div className="flex flex-row text-neutral-700 text-sm gap-[20px]">
                              <p className="w-[150px]">Jenis Kelamin</p>
                              <p>{displayGender(details.gender)}</p>
                        </div>
                  </div>

                  {/* Popup */}
                  {showPopup && (
                        <PopupPersonalDetails
                              data={details}
                              onClose={() => setShowPopup(false)}
                              onSave={handleSave}
                              saving={saving}
                        />
                  )}
            </div>
      );
}
