'use client';
import { useState } from "react";
import { PopupLocationFilter } from "../Popup/Category/PopupLocationFilter";

export function SeeAllLocationButton() {
      const [showPopup, setShowPopup] = useState(false);

      const handlePopUp = () => {
            setShowPopup(true);
      }

      return (
            <div
                  className="text-sm font-semibold text-primary-500 cursor-pointer"
                  onClick={handlePopUp}
            >
                  Lihat Semua

                  {showPopup && (
                        <PopupLocationFilter
                              onClose={() => setShowPopup(false)}
                        // onSave={onSave}
                        />
                  )}
            </div>
      )
}