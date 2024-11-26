"use client";
import { useState } from "react";

interface AddressCardProps {
      label: string;
      name: string;
      telephone: string;
      address: string;
}

export function AddressCard({ label, name, telephone, address }: AddressCardProps) {
      const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

      return (
            <div className="flex flex-row justify-between bg-transparent border border-neutral-400 gap-2 p-5 rounded-[12px]">
                  <div className="flex flex-col gap-2">
                        <div className="rounded-[12px] bg-info-100 py-2 px-4 w-fit font-semibold text-info-300 text-xs">{label}</div>
                        <p className="font-bold text-sm text-neutral-700">{name}</p>
                        <p className="text-sm text-neutral-700">{telephone}</p>
                        <p className="text-sm text-neutral-600">{address}</p>
                        <div className="inline-flex gap-4 text-primary-500 font-semibold text-sm items-center justify-start cursor-pointer">
                              <div onClick={() => setShowPopup(true)}>
                                    Ubah
                              </div>
                              <hr className="w-[17px] rotate-90" />
                              <div>
                                    Hapus
                              </div>
                        </div>
                  </div>
                  <div className="flex items-center">
                        <div className="px-10 py-2 bg-transparent border border-neutral-400 rounded-3xl font-semibold text-sm cursor-pointer">Pilih</div>
                  </div>
            </div>
      )
}