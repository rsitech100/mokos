"use client";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export function FilterByDelivery() {
      const [isOpen, setIsOpen] = useState(true);

      const toggleArrow = () => setIsOpen((prev) => !prev);

      return (
            <div className="flex flex-col gap-5">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                        <p className="font-bold text-sm text-neutral-700">Pengiriman</p>
                        <button onClick={toggleArrow} aria-label="Toggle filter" className="p-1">
                              <IoIosArrowUp
                                    size={20}
                                    color="#191717"
                                    className={`transform transition-transform duration-300 ${isOpen ? "" : "rotate-180"
                                          }`}
                              />
                        </button>
                  </div>

                  {/* List */}
                  {isOpen && (
                        <div className="flex flex-col gap-5">
                              <CheckboxWithLabel
                                    label="Anter Aja"
                                    id="delivery-antar-aja"
                              />
                        </div>
                  )}
            </div>
      );
}

// CheckboxWithLabel Component
function CheckboxWithLabel({ label, id }: { label: string; id: string }) {
      return (
            <div className="flex items-center gap-2">
                  <input
                        type="checkbox"
                        id={id}
                        className="w-5 h-5 bg-neutral-500 rounded-sm checked:bg-primary-500 focus:outline-none"
                  />
                  <label htmlFor={id} className="text-sm text-neutral-700">
                        {label}
                  </label>
            </div>
      );
}
