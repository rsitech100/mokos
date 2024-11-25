"use client";
import { useState } from "react";
import Image from "next/image";
import { PopupPersonalDetails } from "../Popup/Profile/PopupPersonalDetails";

export function PersonalDetails() {
      // State to manage personal details
      const [details, setDetails] = useState({
            name: "Martin Paes",
            birthDate: "6 November 1995",
            gender: "Laki - laki",
      });

      const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

      // Update handler
      const handleSave = (updatedData: typeof details) => {
            setDetails(updatedData);
            setShowPopup(false); // Close popup
      };

      return (
            <div className="flex flex-col gap-5">
                  {/* Header */}
                  <div className="inline-flex gap-4">
                        <h4 className="text-lg font-extrabold text-neutral-700">Biodata Diri</h4>
                        <div
                              className="inline-flex gap-2 items-center cursor-pointer"
                              onClick={() => setShowPopup(true)}
                        >
                              <Image src="/image/profile/edit.svg" alt="edit-icon" width={20} height={20} className="w-5" />
                              <div className="text-sm text-primary-500 font-bold">Ubah</div>
                        </div>
                  </div>

                  {/* Data List */}
                  <div className="flex flex-col gap-5">
                        <div className="flex flex-row text-neutral-700 text-sm gap-[20px]">
                              <p className="w-[150px]">Nama</p>
                              <p>{details.name}</p>
                        </div>
                        <div className="flex flex-row text-neutral-700 text-sm gap-[20px]">
                              <p className="w-[150px]">Tanggal Lahir</p>
                              <p>{details.birthDate}</p>
                        </div>
                        <div className="flex flex-row text-neutral-700 text-sm gap-[20px]">
                              <p className="w-[150px]">Jenis Kelamin</p>
                              <p>{details.gender}</p>
                        </div>
                  </div>

                  {/* Popup */}
                  {showPopup && (
                        <PopupPersonalDetails
                              data={details}
                              onClose={() => setShowPopup(false)}
                              onSave={handleSave}
                        />
                  )}
            </div>
      );
}
