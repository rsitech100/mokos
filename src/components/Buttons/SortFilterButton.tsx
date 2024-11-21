"use client";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PopupCategorySort } from "../Popup/Category/PopupCategorySort";

export function SortFilterButton() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
      //   console.log("Popup dibuka"); // Debugging
        setIsPopupOpen(true);
    };

    const closePopup = () => {
      //   console.log("Popup ditutup"); // Debugging
        setIsPopupOpen(false);
    };

    return (
        <div className="w-full">
            <div
                className="bg-transparent border border-neutral-400 rounded-lg px-3 py-2.5 flex justify-between items-center w-full cursor-pointer"
                onClick={openPopup}
            >
                <p className="text-sm text-neutral-700">Terbaru</p>
                <IoIosArrowDown size={16} color="#595959" />
            </div>

            {/* Popup hanya ditampilkan jika isPopupOpen true */}
            {isPopupOpen && (
                <PopupCategorySort isOpen={isPopupOpen} onClose={closePopup} />
            )}
        </div>
    );
}
