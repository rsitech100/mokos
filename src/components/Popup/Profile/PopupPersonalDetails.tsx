"use client";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

type PopupPersonalDetailsProps = {
      data: {
            name: string;
            birthDate: string;
            gender: string;
      };
      onClose: () => void;
      onSave: (updatedData: {
            name: string;
            birthDate: string;
            gender: string;
      }) => void;
};

export function PopupPersonalDetails({
      data,
      onClose,
      onSave,
}: PopupPersonalDetailsProps) {
      const [isMobile, setIsMobile] = useState(false);
      const [formData, setFormData] = useState(data); // Form data state

      // Cek apakah tampilan adalah mobile
      useEffect(() => {
            const handleResize = () => {
                  setIsMobile(window.innerWidth <= 768);
            };
            handleResize(); // Cek saat komponen pertama kali dirender
            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
      }, []);

      // Format date to string
      const formatDate = (dateString: string): string => {
            const options: Intl.DateTimeFormatOptions = {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
            };
            const date = new Date(dateString);
            return new Intl.DateTimeFormat("id-ID", options).format(date);
      };

      const handleChange = (
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => {
            const { name, value } = e.target;

            setFormData((prev) => ({
                  ...prev,
                  [name]: name === "birthDate" ? formatDate(value) : value, // Format date only for birthDate
            }));
      };

      const handleSubmit = () => {
            onSave(formData); // Pass updated data to parent
      };

      return (
            <div className={`fixed inset-0 flex items-center justify-center ${isMobile ? "bg-white" : "bg-black bg-opacity-50 px-2"}  z-50`}>
                  <div className={`${isMobile ? 'w-full h-full flex flex-col justify-between pb-5' : 'bg-white rounded-xl p-5 shadow-md w-[468px]'}`}>
                        <div className="flex flex-col">                    
                        <div className="inline-flex w-full justify-start items-center md:justify-between shadow-md lg:shadow-none p-5 md:p-0 gap-3 md:gap-0">
                        <div onClick={onClose} className="flex md:hidden cursor-pointer">
                                    <FaArrowLeft size={14} color="#00000" />
                              </div>   
                              <h3 className="textmd font-bold mb-0 lg:mb-4 text-center">Ubah Biodata</h3>
                              <div onClick={onClose} className="hidden md:flex cursor-pointer">
                                    <IoClose size={24} color="#00000" />
                              </div>
                        </div>
                        <div className="flex flex-col gap-4 p-5 md:p-0">
                              {/* Name Input */}
                              <div className="flex flex-col gap-2">
                                    <label className="text-sm text-neutral-700 font-bold">Nama</label>
                                    <input
                                          type="text"
                                          name="name"
                                          value={formData.name}
                                          onChange={handleChange}
                                          className="w-full p-2 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none"
                                    />
                              </div>

                              {/* Birth Date Input */}
                              <div className="flex flex-col gap-2">
                                    <label className="text-sm text-neutral-700 font-bold">
                                          Tanggal Lahir
                                    </label>
                                    <input
                                          type="date"
                                          name="birthDate"
                                          onChange={handleChange}
                                          className="w-full p-2 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none"
                                    />
                                    <p className="mt-2 text-sm text-neutral-500">
                                          Tanggal Lahir: {formData.birthDate}
                                    </p>
                              </div>

                              {/* Gender Select */}
                              <div className="flex flex-col gap-2">
                                    <label className="text-sm text-neutral-700 font-bold">
                                          Jenis Kelamin
                                    </label>
                                    <div className="flex flex-row gap-6">
                                          <div className="inline-flex items-center justify-start">
                                                <input
                                                      type="radio"
                                                      name="gender"
                                                      value="Laki-laki"
                                                      checked={formData.gender === "Laki-laki"}
                                                      onChange={handleChange}
                                                      className="w-4 h-4 text-primary-500 bg-neutral-100 border-neutral-400 focus:ring-primary-500"
                                                />
                                                <label
                                                      htmlFor="laki-laki"
                                                      className="ms-2 text-sm font-medium text-neutral-700"
                                                >
                                                      Laki-laki
                                                </label>
                                          </div>

                                          <div className="inline-flex items-center justify-start">
                                                <input
                                                      type="radio"
                                                      name="gender"
                                                      value="Perempuan"
                                                      checked={formData.gender === "Perempuan"}
                                                      onChange={handleChange}
                                                      className="w-4 h-4 text-primary-500 bg-neutral-100 border-neutral-400 focus:ring-primary-500"
                                                />
                                                <label
                                                      htmlFor="Perempuan"
                                                      className="ms-2 text-sm font-medium text-neutral-700"
                                                >
                                                      Perempuan
                                                </label>
                                          </div>
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
                                    className="w-full lg:w-fit px-10 py-2 bg-primary-500 rounded-3xl text-white font-semibold text-sm"
                              >
                                    Simpan
                              </button>
                        </div>
                  </div>
            </div>
      );
}
