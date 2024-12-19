'use client';
import { useState } from "react";
import { PopupSelectPayment } from "../Popup/CheckoutPayment/PopupSelectPayment";

export function ShoppingSummaryBox() {
      const [showPopup, setShowPopup] = useState(false);

      const togglePopUp = () => {
            setShowPopup(true)
      }

      return (
            <div className="flex flex-col gap-6 p-5 shadow-md bg-white w-full max-w-[330px] h-fit rounded-[12px]">
                  <h4 className="font-extrabold text-lg text-neutral-700">Ringkasan Belanja</h4>
                  <div className="inline-flex justify-between text-sm text-neutral-700">
                        <p>Total Harga (<span>4</span> Barang)</p>
                        <p>Rp800.000</p>
                  </div>
                  <div className="inline-flex justify-between text-sm text-neutral-700">
                        <p>Total Ongkos Kirim</p>
                        <p>Rp10.000</p>
                  </div>
                  <hr className="border-dashed border-neutral-400" />
                  <div className="inline-flex justify-between text-sm text-neutral-700">
                        <p>Total Belanja</p>
                        <p className="font-extrabold text-base">Rp810.000</p>
                  </div>

                  <button className="w-full py-2 rounded-3xl text-neutral-100 bg-primary-500 text-sm font-semibold" onClick={togglePopUp}>
                        Pilih Pembayaran
                  </button>


                  {showPopup && (
                        <PopupSelectPayment
                              onClose={() => setShowPopup(false)}
                        // onSave={onSave}
                        />
                  )}
            </div>
      )
}