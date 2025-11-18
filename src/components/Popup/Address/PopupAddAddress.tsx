"use client";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import DropdownProvinsi from "@/components/Dropdown/DropdownProvinsi";
import { DropdownKecamatan } from "@/components/Dropdown/DropdownKecamatan";
import { DropdownKabupaten } from "@/components/Dropdown/DropdownKabupaten";
import { addAddress } from "@/lib/api/fetch-address";
import toast from "react-hot-toast";


interface PopupAddAddressProps {
      onClose: () => void;
      onSuccess?: () => void;
}

interface RegionData {
      provinceCode: string;
      provinceName: string;
      cityCode: string;
      cityName: string;
      districtCode: string;
      districtName: string;
}

export function PopupAddAddress({ onClose, onSuccess }: PopupAddAddressProps) {
      const [isMobile, setIsMobile] = useState(false);
      const [loading, setLoading] = useState(false);
      
      // Form state
      const [label, setLabel] = useState("");
      const [receiveName, setReceiveName] = useState("");
      const [phone, setPhone] = useState("");
      const [street, setStreet] = useState("");
      const [kodePos, setKodePos] = useState("");
      
      // Region state
      const [selectedProvinsi, setSelectedProvinsi] = useState<string | null>(null);
      const [selectedKabupaten, setSelectedKabupaten] = useState<string | null>(null);
      const [selectedKecamatan, setSelectedKecamatan] = useState<string | null>(null);
      
      // Store region names
      const [regionData, setRegionData] = useState<RegionData>({
            provinceCode: "",
            provinceName: "",
            cityCode: "",
            cityName: "",
            districtCode: "",
            districtName: "",
      });

      // Cek apakah tampilan adalah mobile
      useEffect(() => {
            const handleResize = () => {
                  setIsMobile(window.innerWidth <= 768);
            };
            handleResize(); // Cek saat komponen pertama kali dirender
            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
      }, []);

      const handleSubmit = async () => {
            // Validation
            if (!label.trim()) {
                  toast.error("Label harus diisi");
                  return;
            }
            if (!receiveName.trim()) {
                  toast.error("Nama penerima harus diisi");
                  return;
            }
            if (!phone.trim()) {
                  toast.error("Nomor HP harus diisi");
                  return;
            }
            if (!selectedProvinsi || !selectedKabupaten || !selectedKecamatan) {
                  toast.error("Provinsi, Kabupaten, dan Kecamatan harus dipilih");
                  return;
            }
            if (!kodePos.trim()) {
                  toast.error("Kode pos harus diisi");
                  return;
            }
            if (!street.trim()) {
                  toast.error("Detail alamat harus diisi");
                  return;
            }

            setLoading(true);
            try {
                  const addressData = {
                        region: {
                              provinceCode: regionData.provinceCode,
                              provinceName: regionData.provinceName,
                              cityCode: regionData.cityCode,
                              cityName: regionData.cityName,
                              districtCode: regionData.districtCode,
                              districtName: regionData.districtName,
                              postalCode: kodePos,
                        },
                        label: label,
                        receiveName: receiveName,
                        phone: phone,
                        street: street,
                        lat: 0, // Default value, bisa diganti dengan geolocation jika perlu
                        lon: 0, // Default value
                        merchantId: "string", // Adjust sesuai kebutuhan
                  };

                  const response = await addAddress(addressData);
                  
                  if (response.success) {
                        toast.success("Alamat berhasil ditambahkan");
                        if (onSuccess) onSuccess();
                        onClose();
                  } else {
                        throw new Error(response.message || "Gagal menambahkan alamat");
                  }
            } catch (error) {
                  const msg = error instanceof Error ? error.message : "Terjadi kesalahan";
                  toast.error(msg);
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div 
                  className={`fixed inset-0 flex items-center justify-center ${isMobile ? "bg-white" : "bg-black bg-opacity-50 px-2"}  z-50`}
                  onClick={onClose}
            >
                  <div 
                        className={`${isMobile ? 'w-full h-full flex flex-col justify-between pb-5' : 'bg-white rounded-xl p-5 shadow-md w-[468px] h-[500px]'}`}
                        onClick={(e) => e.stopPropagation()}
                  >
                        <div className="flex flex-col gap-2 overflow-y-auto h-full">
                              <div className="inline-flex w-full justify-start items-center md:justify-between shadow-md md:shadow-none p-5 md:p-0 gap-3 md:gap-0 text-neutral-700">
                                    <div onClick={onClose} className="flex md:hidden cursor-pointer">
                                          <FaArrowLeft size={14} color="#00000" onClick={onClose} />
                                    </div>
                                    <h3 className="text-sm font-bold text-center">Tambah Alamat</h3>
                                    <div onClick={onClose} className="hidden md:flex cursor-pointer">
                                          <IoClose size={24} color="#00000" onClick={onClose} />
                                    </div>
                              </div>
                              <div className="flex flex-col gap-3.5 text-left px-5 lg:px-0">
                                    {/* Label Input */}
                                    <div className="flex flex-col gap-2">
                                          <label className="text-sm text-neutral-700 font-bold">Label</label>
                                          <input
                                                type="text"
                                                name="label"
                                                value={label}
                                                onChange={(e) => setLabel(e.target.value)}
                                                placeholder="Contoh: rumah"
                                                className="w-full p-2.5 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none"
                                          />
                                    </div>

                                    {/* Nama Penerima Input */}
                                    <div className="flex flex-col gap-2">
                                          <label className="text-sm text-neutral-700 font-bold">Nama Penerima</label>
                                          <input
                                                type="text"
                                                name="receiveName"
                                                value={receiveName}
                                                onChange={(e) => setReceiveName(e.target.value)}
                                                placeholder="Masukkan nama penerima"
                                                className="w-full p-2.5 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none"
                                          />
                                    </div>

                                    {/* Nomor HP Input */}
                                    <div className="flex flex-col gap-2">
                                          <label className="text-sm text-neutral-700 font-bold">Nomor HP</label>
                                          <input
                                                type="text"
                                                name="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Masukkan nomor HP"
                                                className="w-full p-2.5 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none"
                                          />
                                    </div>


                                    {/* Provinsi Dropdown Input */}
                                    <DropdownProvinsi 
                                          onChange={(value, label) => {
                                                setSelectedProvinsi(value);
                                                setRegionData(prev => ({
                                                      ...prev,
                                                      provinceCode: value || "",
                                                      provinceName: label || "",
                                                }));
                                                // Reset kabupaten dan kecamatan saat provinsi berubah
                                                setSelectedKabupaten(null);
                                                setSelectedKecamatan(null);
                                          }} 
                                    />


                                    {/* Kabupaten Dropdown Input */}
                                    <DropdownKabupaten 
                                          provinsiId={selectedProvinsi}
                                          onChange={(value, label) => {
                                                setSelectedKabupaten(value);
                                                setRegionData(prev => ({
                                                      ...prev,
                                                      cityCode: value || "",
                                                      cityName: label || "",
                                                }));
                                                // Reset kecamatan saat kabupaten berubah
                                                setSelectedKecamatan(null);
                                          }}
                                    />

                                    {/* Kecamatan Dropdown Input */}
                                    <DropdownKecamatan 
                                          kabupatenId={selectedKabupaten} 
                                          onChange={(value, label) => {
                                                setSelectedKecamatan(value);
                                                setRegionData(prev => ({
                                                      ...prev,
                                                      districtCode: value || "",
                                                      districtName: label || "",
                                                }));
                                          }}
                                    />

                                    {/* Kode Pos Input Manual */}
                                    <div className="flex flex-col gap-2">
                                          <label className="text-sm text-neutral-700 font-bold">Kode Pos</label>
                                          <input
                                                type="text"
                                                name="kodePos"
                                                value={kodePos}
                                                onChange={(e) => setKodePos(e.target.value)}
                                                placeholder="Masukkan kode pos"
                                                className="w-full p-2.5 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none"
                                          />
                                    </div>

                                    {/* Detail Alamat Input */}
                                    <div className="flex flex-col gap-2">
                                          <label className="text-sm text-neutral-700 font-bold">Detail Alamat</label>
                                          <textarea
                                                rows={5}
                                                name="street"
                                                value={street}
                                                onChange={(e) => setStreet(e.target.value)}
                                                placeholder="Masukkan detail alamat lengkap"
                                                className="w-full p-2.5 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none"
                                          ></textarea>
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
                                                disabled={loading}
                                                className={`w-full lg:w-fit px-10 py-2 rounded-3xl text-white font-semibold text-sm ${
                                                      loading ? "bg-neutral-400 cursor-not-allowed" : "bg-primary-500 hover:bg-primary-600"
                                                }`}
                                          >
                                                {loading ? "Menyimpan..." : "Simpan"}
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

