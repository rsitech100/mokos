"use client";
import { useState } from "react";
import { PopupAddAddress } from "../Popup/Address/PopupAddAddress";
import { FaPlus } from "react-icons/fa6";

export function AddAddressButton() {
      const [showPopup, setShowPopup] = useState(false);

      const togglePopUp = () => {
            setShowPopup(true)
      }
      return (
            <div className="cursor-pointer w-full md:w-fit text-center bg-primary-500 text-white rounded-3xl px-5 py-2 text-sm flex justify-center items-center gap-2" onClick={togglePopUp}>
                  <FaPlus size={20} color="#FFFFFF" />
                  Tambah Alamat
                  {showPopup && (
                        <PopupAddAddress
                              onClose={() => setShowPopup(false)}
                              // onSave={onSave}
                        />
                  )}
            </div>
      )
}