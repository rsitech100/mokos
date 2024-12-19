'use client';
import { AddressList } from "@/components/Address/AddressList";
import { AddAddressButton } from "@/components/Buttons/AddAddressButton";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface PopupChangeAddressProps {
      onClose: () => void;
      onSave?: (updatedData: {
            name: string;
            birthDate: string;
      }) => void;
}

export function PopupChangeAddress({ onClose }: PopupChangeAddressProps) {
      const [isMobile, setIsMobile] = useState(false);
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
                  <div className={`${isMobile ? 'w-full h-full flex flex-col justify-between pb-5' : 'bg-white rounded-xl p-5 shadow-md w-[640px]'}`}>
                        <div className="flex flex-col gap-6">
                              <div className="inline-flex w-full justify-start items-center md:justify-between shadow-md md:shadow-none p-5 md:p-0 gap-3 md:gap-0 text-neutral-700">
                                    <div onClick={onClose} className="flex md:hidden cursor-pointer">
                                          <FaArrowLeft size={14} color="#00000" />
                                    </div>
                                    <h3 className="text-lg font-extrabold mb-0 lg:mb-4 text-center">Ubah Alamat</h3>
                                    <div onClick={onClose} className="hidden md:flex cursor-pointer">
                                          <IoClose size={24} color="#00000" />
                                    </div>
                              </div>
                              <div className="flex flex-col gap-6 px-5">
                              <AddAddressButton />
                              <AddressList />
                              </div>
                        </div>
                  </div>
            </div>
      )
}