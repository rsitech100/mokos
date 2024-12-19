'use client';
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

type ContentKey = 'Content 1' | 'Content 2' | 'Content 3' | 'Content 4';

interface SidebarTosProps {
      activeBar: ContentKey;
      onTabClick: (item: ContentKey) => void;
}

type BarItemType = {
      id: number;
      label: ContentKey;
};

const BarItem: BarItemType[] = [
      { id: 1, label: 'Content 1' },
      { id: 2, label: 'Content 2' },
      { id: 3, label: 'Content 3' },
      { id: 4, label: 'Content 4' },
];

export function SidebarTos({ activeBar, onTabClick }: SidebarTosProps) {
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);

      return (
            <div>
                  {/* Sidebar untuk Desktop */}
                  <p className="block md:hidden font-semibold text-sm text-neutral-700 mb-2">Syarat dan Ketentuan</p>
                  <div className="hidden md:flex border border-neutral-400 flex-col px-5 py-3 gap-5 text-left rounded-[12px] w-[225px] h-fit">
                        <p className="text-sm text-neutral-700 font-semibold">Syarat dan Ketentuan</p>
                        {BarItem.map((item) => (
                              <button
                                    key={item.id}
                                    onClick={() => onTabClick(item.label)}
                                    className={`text-left text-sm ${activeBar === item.label
                                          ? 'bg-primary-100 text-primary-500 rounded-xl font-semibold py-2 px-2'
                                          : 'ms-2 text-neutral-700'
                                          }`}
                              >
                                    {item.label}
                              </button>
                        ))}
                  </div>

                  {/* Dropdown untuk Mobile */}
                  <div className="md:hidden">
                        <button
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                              className="w-full flex justify-between items-center border border-neutral-400 px-5 py-3 text-sm text-neutral-700 font-semibold rounded-[12px]"
                        >
                              <span>
                                    {activeBar}
                              </span>
                              <IoIosArrowDown />

                        </button>

                        {isDropdownOpen && (
                              <div className="border border-neutral-400 mt-2 flex flex-col px-5 py-3 gap-5 text-left rounded-[12px]">
                                    {BarItem.map((item) => (
                                          <button
                                                key={item.id}
                                                onClick={() => {
                                                      onTabClick(item.label);
                                                      setIsDropdownOpen(false); // Tutup dropdown setelah memilih item
                                                }}
                                                className="text-left text-sm text-neutral-700"
                                          >
                                                {item.label}
                                          </button>
                                    ))}
                              </div>
                        )}
                  </div>
            </div>
      );
}
