"use client";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export function FilterByPrice() {
      const [isOpen, setIsOpen] = useState(true);

      const toggleArrow = () => setIsOpen((prev) => !prev);

      return (
            <div className="flex flex-col gap-5">
                  {/* Header Section */}
                  <div className="flex justify-between items-center">
                        <p className="font-bold text-sm text-neutral-700">Rentang Harga</p>
                        <button
                              onClick={toggleArrow}
                              aria-label="Toggle filter"
                              className="p-1"
                        >
                              <IoIosArrowUp
                                    size={20}
                                    color="#191717"
                                    className={`transform transition-transform duration-300 ${isOpen ? "" : "rotate-180"
                                          }`}
                              />
                        </button>
                  </div>

                  {/* Filter Section */}
                  {isOpen && (
                        <div className="flex flex-col gap-5">
                              <InputField placeholder="Harga Terendah" />
                              <InputField placeholder="Harga Tertinggi" />
                        </div>
                  )}
            </div>
      );
}

// InputField Component
function InputField({ placeholder }: { placeholder: string }) {
      return (
            <div className="flex items-center text-sm bg-transparent border border-neutral-400 rounded-lg p-3 gap-2">
                  <span className="font-bold text-neutral-700">Rp</span>
                  <input
                        type="number"
                        placeholder={placeholder}
                        className="bg-transparent focus:outline-none text-neutral-700 w-full"
                  />
            </div>
      );
}
