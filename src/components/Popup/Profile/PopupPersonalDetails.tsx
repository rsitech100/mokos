"use client";

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

interface PopupPersonalDetailsProps {
      data: {
            name: string;
            dob: string;     // YYYY-MM-DD
            gender: string;  // "m" | "f"
      };
      onClose: () => void;
      onSave: (updatedData: {
            name: string;
            dob: string;
            gender: string;
      }) => void;
      saving?: boolean;
}

export function PopupPersonalDetails({
      data,
      onClose,
      onSave,
      saving = false,
}: PopupPersonalDetailsProps) {
      const [isMobile, setIsMobile] = useState(false);
      const [formData, setFormData] = useState(data);

      // Detect mobile screen size
      useEffect(() => {
            const handleResize = () => {
                  setIsMobile(window.innerWidth <= 768);
            };
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
      }, []);

      const handleChange = (
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                  ...prev,
                  [name]: value,
            }));
      };

      // Always send YYYY-MM-DD format
      const handleSubmit = () => {
            onSave({
                  ...formData,
                  dob: formData.dob, // type="date" already gives YYYY-MM-DD
            });
      };

      return (
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
                                          <FaArrowLeft size={14} color="#000000" />
                                    </div>
                                    <h3 className="text-md font-bold mb-0 lg:mb-4 text-center">
                                          Ubah Biodata
                                    </h3>
                                    <div onClick={onClose} className="hidden md:flex cursor-pointer">
                                          <IoClose size={24} color="#000000" />
                                    </div>
                              </div>

                              {/* Form */}
                              <div className="flex flex-col gap-4 p-5 md:p-0">
                                    {/* Nama */}
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

                                    {/* Tanggal Lahir */}
                                    <div className="flex flex-col gap-2">
                                          <label className="text-sm text-neutral-700 font-bold">
                                                Tanggal Lahir
                                          </label>
                                          <input
                                                type="date"
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-neutral-400 rounded-lg text-neutral-700 text-sm focus:outline-none"
                                          />

                                          {formData.dob && (
                                                <p className="mt-2 text-sm text-neutral-500">
                                                      Tanggal Lahir:{" "}
                                                      {new Date(formData.dob).toLocaleDateString("id-ID", {
                                                            day: "2-digit",
                                                            month: "long",
                                                            year: "numeric",
                                                      })}
                                                </p>
                                          )}
                                    </div>

                                    {/* Gender */}
                                    <div className="flex flex-col gap-2">
                                          <label className="text-sm text-neutral-700 font-bold">
                                                Jenis Kelamin
                                          </label>
                                          <div className="flex flex-row gap-6">
                                                <label className="inline-flex items-center justify-start">
                                                      <input
                                                            type="radio"
                                                            name="gender"
                                                            value="m"
                                                            checked={formData.gender === "m"}
                                                            onChange={handleChange}
                                                            className="w-4 h-4"
                                                      />
                                                      <span className="ms-2 text-sm font-medium text-neutral-700">
                                                            Laki-laki
                                                      </span>
                                                </label>

                                                <label className="inline-flex items-center justify-start">
                                                      <input
                                                            type="radio"
                                                            name="gender"
                                                            value="f"
                                                            checked={formData.gender === "f"}
                                                            onChange={handleChange}
                                                            className="w-4 h-4"
                                                      />
                                                      <span className="ms-2 text-sm font-medium text-neutral-700">
                                                            Perempuan
                                                      </span>
                                                </label>
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
                                    disabled={saving}
                                    className={`w-full lg:w-fit px-10 py-2 rounded-3xl text-white font-semibold text-sm ${saving ? "bg-neutral-400 cursor-not-allowed" : "bg-primary-500"
                                          }`}
                              >
                                    {saving ? "Menyimpan..." : "Simpan"}
                              </button>
                        </div>
                  </div>
            </div>
      );
}
