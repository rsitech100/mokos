"use client";
import { useState } from "react";
import { PopupAddAddress } from "../Popup/Address/PopupAddAddress";
import { FaPlus } from "react-icons/fa6";

interface AddAddressButtonProps {
      onSuccess?: () => void;
}

export function AddAddressButton({ onSuccess }: AddAddressButtonProps) {
      const [showPopup, setShowPopup] = useState(false);

      const togglePopUp = () => {
            setShowPopup(true);
      }

      const handleClose = () => {
            setShowPopup(false);
      };

      const handleSuccess = () => {
            setShowPopup(false);
            if (onSuccess) onSuccess();
      };

      return (
            <div className="cursor-pointer w-full md:w-fit text-center bg-primary-500 text-white rounded-3xl px-5 py-2.5 text-sm flex justify-center items-center gap-2" onClick={togglePopUp}>
                  <FaPlus size={15} color="#FFFFFF" />
                  Tambah Alamat
                  {showPopup && (
                        <PopupAddAddress
                              onClose={handleClose}
                              onSuccess={handleSuccess}
                        />
                  )}
            </div>
      )
}