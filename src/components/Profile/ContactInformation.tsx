"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PopupOTP } from "../Popup/Register/PopupOTP";
import { useAuth } from "@/context/AuthContext";

type ContactInformationType = {
      title: string;
      value: string;
};

export function ContactInformation() {
      const { user, updateUser } = useAuth();
      const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
      const [editIndex, setEditIndex] = useState<number | null>(null);
      
      // State to store updated values dari user
      const [updatedValues, setUpdatedValues] = useState<ContactInformationType[]>([
            { title: "Nomor HP", value: user?.phone || "" },
            { title: "Email", value: user?.email || "" },
      ]);

      // Update state saat user data berubah
      useEffect(() => {
            setUpdatedValues([
                  { title: "Nomor HP", value: user?.phone || "" },
                  { title: "Email", value: user?.email || "" },
            ]);
      }, [user]); 

      const openPopUp = () => setIsPopupOpen(true);
      const closePopUp = () => setIsPopupOpen(false);

      const handleEditClick = (index: number) => {
            setEditIndex(index); // Set the item to edit mode
      };

      const handleInputChange = (index: number, newValue: string) => {
            const newValues = [...updatedValues];
            newValues[index].value = newValue;
            setUpdatedValues(newValues);
      };

      const handleInputKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                  setEditIndex(null);
                  // Update user context saat Enter ditekan
                  if (index === 0) {
                        updateUser({ phone: updatedValues[0].value });
                  } else if (index === 1) {
                        updateUser({ email: updatedValues[1].value });
                  }
            }
      };

      const handleChangePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            openPopUp();
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
                                    <div className="inline-flex gap-3">
                                          {editIndex === index ? (
                                                <input
                                                      type="text"
                                                      className="border border-neutral-400 rounded-md px-2 py-1 text-sm"
                                                      value={item.value}
                                                      onChange={(e) => handleInputChange(index, e.target.value)}
                                                      onKeyDown={(e) => handleInputKeyDown(index, e)}
                                                />
                                          ) : (
                                                <p className="text-right">{item.value}</p>
                                          )}
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

                  {/* <PopupOTP isOpen={isPopupOpen} onClose={closePopUp} email={user?.email || ""} requestKey={null} type="login" /> */}
            </div>
      );
}
