"use client";
import { useState } from "react";
import { deleteAddress, setPrimaryAddress, AddressData } from "@/lib/api/fetch-address";
import toast from "react-hot-toast";
import { PopupEditAddress } from "../Popup/Address/PopupEditAddress";
import { FaCheck } from "react-icons/fa";

interface AddressCardProps {
      id: string;
      label: string;
      name: string;
      telephone: string;
      address: string;
      isPrimary?: boolean;
      addressData: AddressData;
      onDelete?: () => void;
      onUpdate?: () => void;
}

export function AddressCard({ id, label, name, telephone, address, isPrimary, addressData, onDelete, onUpdate }: AddressCardProps) {
      const [showEditPopup, setShowEditPopup] = useState(false);
      const [deleting, setDeleting] = useState(false);
      const [settingPrimary, setSettingPrimary] = useState(false);

      const handleDelete = async () => {
            if (!confirm("Apakah Anda yakin ingin menghapus alamat ini?")) {
                  return;
            }

            setDeleting(true);
            try {
                  const response = await deleteAddress(id);
                  if (response.success) {
                        toast.success("Alamat berhasil dihapus");
                        if (onDelete) onDelete();
                  } else {
                        throw new Error(response.message || "Gagal menghapus alamat");
                  }
            } catch (error) {
                  const msg = error instanceof Error ? error.message : "Terjadi kesalahan";
                  toast.error(msg);
            } finally {
                  setDeleting(false);
            }
      };

      const handleSetPrimary = async () => {
            setSettingPrimary(true);
            try {
                  const response = await setPrimaryAddress(id);
                  if (response.success) {
                        toast.success("Alamat utama berhasil diatur");
                        if (onUpdate) onUpdate();
                  } else {
                        throw new Error(response.message || "Gagal mengatur alamat utama");
                  }
            } catch (error) {
                  const msg = error instanceof Error ? error.message : "Terjadi kesalahan";
                  toast.error(msg);
            } finally {
                  setSettingPrimary(false);
            }
      };

      const handleEditSuccess = () => {
            setShowEditPopup(false);
            if (onUpdate) onUpdate();
      };

      return (
            <>
                  <div className={`flex flex-col md:flex-row justify-between bg-transparent border gap-2 p-5 rounded-[12px] ${isPrimary ? "border-primary-500 bg-[#F7FCFF]" : "border-neutral-400"}`}>
                        <div className="">
                              <div className="flex flex-col gap-2">
                                    <div className="inline-flex gap-2 items-center">
                                          <div className="rounded-[12px] bg-info-100 py-2 px-4 w-fit font-semibold text-info-300 text-xs">{label}</div>
                                          {/* {isPrimary && (
                                          <div className="rounded-[12px] bg-success-100 py-2 px-4 w-fit font-semibold text-success-300 text-xs">Utama</div>
                                    )} */}
                                    </div>
                                    <p className="font-bold text-sm text-neutral-700">{name}</p>
                                    <p className="text-sm text-neutral-700">{telephone}</p>
                                    <p className="text-sm text-neutral-600">{address}
                                          ,&nbsp;{addressData.districtName}
                                          ,&nbsp;{addressData.cityName}
                                          ,&nbsp;{addressData.provinceName}
                                          &nbsp;{addressData.postalCode}
                                    </p>
                              </div>
                              <div className="inline-flex gap-4 text-primary-500 font-semibold text-sm items-center justify-start mt-3">
                                    <div onClick={() => setShowEditPopup(true)} className="cursor-pointer hover:text-primary-600">
                                          Ubah
                                    </div>
                                    <hr className="w-[17px] rotate-90 border-neutral-400" />
                                    <div
                                          onClick={handleDelete}
                                          className={`cursor-pointer hover:text-primary-600 ${deleting ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                          {deleting ? "Menghapus..." : "Hapus"}
                                    </div>
                              </div>
                        </div>
                        <div className="flex justify-center items-center mt-5 md:mt-0">
                              {!isPrimary && (
                                    <button
                                          onClick={handleSetPrimary}
                                          disabled={settingPrimary}
                                          className={`w-full md:w-fit px-10 py-2 bg-transparent border border-neutral-400 rounded-3xl font-semibold text-sm text-center transition-colors ${settingPrimary
                                                ? "opacity-50 cursor-not-allowed"
                                                : "hover:bg-primary-50 hover:border-primary-500 hover:text-primary-500 cursor-pointer"
                                                }`}
                                    >
                                          {settingPrimary ? "Memproses..." : "Jadikan Utama"}
                                    </button>
                              )}
                              {isPrimary && (
                                    <div className="w-full md:w-fit px-2 py-2 bg-primary-500 text-white items-center mx-auto flex justify-center rounded-full font-semibold text-sm text-center">
                                          <FaCheck color="#FFFFFF" />
                                    </div>
                              )}
                        </div>
                  </div>
                  {showEditPopup && (
                        <PopupEditAddress
                              onClose={() => setShowEditPopup(false)}
                              onSuccess={handleEditSuccess}
                              addressData={addressData}
                        />
                  )
                  }
            </>
      )
}