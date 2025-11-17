"use client";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import DropdownProvinsi from "@/components/Dropdown/DropdownProvinsi";
import { DropdownKecamatan } from "@/components/Dropdown/DropdownKecamatan";
import { DropdownKabupaten } from "@/components/Dropdown/DropdownKabupaten";
import DropdownKodePos from "@/components/Dropdown/DropdownKodePos";


interface PopupAddAddressProps {
      onClose: () => void;
      onSave?: (updatedData: {
            name: string;
            dob: string;
      }) => void;
}

export function PopupAddAddress({ onClose }: PopupAddAddressProps) {
      const [isMobile, setIsMobile] = useState(false);
      const [selectedProvinsi, setSelectedProvinsi] = useState<string | null>(null);
      const [selectedKabupaten, setSelectedKabupaten] = useState<string | null>(null);
      const [selectedKecamatan, setSelectedKecamatan] = useState<string | null>(null);
      // const [formData, setFormData] = useState('');

      // Cek apakah tampilan adalah mobile
      useEffect(() => {
            const handleResize = () => {
                  setIsMobile(window.innerWidth <= 768);
            };
            handleResize(); // Cek saat komponen pertama kali dirender
            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
      }, []);

      // const handleSubmit = () => {
      //       onSave(formData); // Pass updated data to parent
      // };

      return (
            <div className={`fixed inset-0 flex items-center justify-center ${isMobile ? "bg-white" : "bg-black bg-opacity-50 px-2"}  z-50`}>
                  <div className={`${isMobile ? 'w-full h-full flex flex-col justify-between pb-5' : 'bg-white rounded-xl p-5 shadow-md w-[468px] h-[500px]'}`}>
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
                                                name="name"
                                                // value={formData.name}
                                                // onChange={handleChange}
                                                placeholder="Contoh: rumah"
                                                className="w-full p-2.5 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none"
                                          />
                                    </div>

                                    {/* Nama Penerima Input */}
                                    <div className="flex flex-col gap-2">
                                          <label className="text-sm text-neutral-700 font-bold">Nama Penerima</label>
                                          <input
                                                type="text"
                                                name="name"
                                                // value={formData.name}
                                                // onChange={handleChange}
                                                placeholder="Masukkan nama penerima"
                                                className="w-full p-2.5 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none"
                                          />
                                    </div>

                                    {/* Nomor HP Input */}
                                    <div className="flex flex-col gap-2">
                                          <label className="text-sm text-neutral-700 font-bold">Nomor HP</label>
                                          <input
                                                type="text"
                                                name="name"
                                                // value={formData.name}
                                                // onChange={handleChange}
                                                placeholder="Masukkan nomor HP"
                                                className="w-full p-2.5 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none"
                                          />
                                    </div>


                                    {/* Provinsi Dropdown Input */}
                                    <DropdownProvinsi onChange={(value) => setSelectedProvinsi(value)} />


                                    {/* Kabupaten Dropdown Input */}
                                    <DropdownKabupaten 
                                    provinsiId={selectedProvinsi}
                                    onChange={(value) => setSelectedKabupaten(value)}
      />

                                    {/* Kecamatan Dropdown Input */}
                                    <DropdownKecamatan 
                                    kabupatenId={selectedKabupaten} 
                                    onChange={(value) => setSelectedKecamatan(value)}
                                    />

                                    {/* KodePos Dropdown Input */}
                                    <DropdownKodePos 
                                    kabupatenId={selectedKabupaten} 
                                    kecamatanId={selectedKecamatan} 
                                    />


                                    {/* Detail Alamat Input */}
                                    <div className="flex flex-col gap-2">
                                          <label className="text-sm text-neutral-700 font-bold">Detail Alamat</label>
                                          <textarea
                                                rows={5}
                                                name="name"
                                                // value={formData.name}
                                                // onChange={handleChange}
                                                placeholder="Masukkan nomor HP"
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
                                                // onClick={handleSubmit}
                                                className="w-full lg:w-fit px-10 py-2 bg-primary-500 rounded-3xl text-white font-semibold text-sm"
                                          >
                                                Simpan
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

