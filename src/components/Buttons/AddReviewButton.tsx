'use client';
import { useState } from "react";
import { PopupWriteReview } from "../Popup/Review/PopupWriteReview";

export function AddReviewButton() {
      const [showPopup, setShowPopup] = useState(false);

      const handlePopUp = () => {
            setShowPopup(true);
      }

      return (
            <button
                  className="w-full md:w-fit bg-primary-500 text-neutral-100 py-2 rounded-3xl px-12 text-sm font-semibold"
                  onClick={handlePopUp}>
                  Beri Ulasan

                  {showPopup && (
                        <PopupWriteReview
                              onClose={() => setShowPopup(false)}
                        // onSave={onSave}
                        />
                  )}
            </button>
      )
}