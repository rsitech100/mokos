"use client";
import { useState } from "react";
import Image from "next/image";
import { PopupCategoryFilter } from "../Popup/Category/PopupCategoryFilter";
import { ListFilterCategory } from "../Category/ListFilterCategory";

export function FilterButton() {
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
                  <div className="bg-transparent border border-neutral-400 rounded-lg px-3 py-2.5 flex justify-between items-center w-full cursor-pointer" onClick={openPopup}>
                        <p className="text-sm text-neutral-700">Filter</p>
                        <Image src="/image/category/filter.svg" alt="filter-icon" width={16} height={16} className="w-4" />

                  </div>
                  {
                        isPopupOpen && (
                              <div className="flex flex-col gap-3">
                                    <PopupCategoryFilter isOpen={isPopupOpen} onClose={closePopup}>
                                          <ListFilterCategory />
                                    </PopupCategoryFilter>
                              </div>
                        )
                  }
            </div>

      );
}
