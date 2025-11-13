"use client";
import { useState } from "react";
import { PopupChangeAddress } from "../Popup/CheckoutPayment/PopupChangeAddress";

export function ShippingAddressUser() {
      const [showPopup, setShowPopup] = useState(false);

      const togglePopUp = () => {
            setShowPopup(true)
      }

      return (
            <div className="w-full p-5 flex flex-col md:flex-row gap-4 rounded-[12px] shadow-md bg-white justify-between">
                  <div className="flex flex-col gap-4">
                        <h5 className="font-bold text-base text-neutral-700">Alamat Pengiriman</h5>
                        <div className="inline-flex gap-2 items-center text-xs sm:text-sm">
                              <div className="bg-info-100 text-info-300 font-semibold py-2 px-3 rounded-[12px]">Kantor</div>
                              <div className="text-neutral-700">Home</div>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-700 font-semibold">Martin Paes</p>
                        <p className="text-xs sm:text-sm text-neutral-700">081234567890</p>
                        <p className="text-xs sm:text-sm text-neutral-600">Gedung Jaya, Jl. MH Thamrin No.12M Jakarta, Indonesia</p>
                  </div>
                  <div className="flex items-center justify-center w-full md:w-fit">
                        <button
                              onClick={togglePopUp}
                              className="rounded-3xl px-8 py-2 font-semibold border border-neutral-400 text-sm text-neutral-700 w-full md:w-fit">
                              Ubah Alamat
                        </button>
                  </div>

                  {showPopup && (
                        <PopupChangeAddress
                              onClose={() => setShowPopup(false)}
                        // onSave={onSave}
                        />
                  )}
            </div>
      )
}