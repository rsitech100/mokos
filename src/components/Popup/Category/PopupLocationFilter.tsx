"use client";
import { HeaderPopupFilter } from "@/components/Header/HeaderPopupFilter";
import { InputSearchLocation } from "@/components/Input/InputSearchLocation";
import { fetchProvinsi } from "@/lib/api/fetch-provinsi";
import { useState, useEffect } from "react";

interface PopupLocationFilterProps {
      onClose: () => void;
}

export function PopupLocationFilter({ onClose }: PopupLocationFilterProps) {
      const [isMobile, setIsMobile] = useState(false);
      const [provinsi, setProvinsi] = useState<{ value: string; label: string }[]>([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

      useEffect(() => {
            const handleResize = () => {
                  setIsMobile(window.innerWidth <= 1200);
            };
            handleResize(); // Cek saat komponen pertama kali dirender
            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
      }, []);

      // fetching data provinsi using useEffect
      useEffect(() => {
            const loadProvinsi = async () => {
                  const data = await fetchProvinsi();
                  if (data && Array.isArray(data)) {
                        const sortedData = data.sort((a, b) =>
                              a.label.localeCompare(b.label)
                        );
                        setProvinsi(sortedData);
                  }
            };
            loadProvinsi();
      }, []);

      // button for close the popup in window
      const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) {
                  onClose();
            }
      };

      const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
      };

      const handleCheckboxChange = (value: string) => {
            setSelectedLocations((prev) =>
                  prev.includes(value)
                        ? prev.filter((item) => item !== value)
                        : [...prev, value]
            );
      };

      const filteredProvinsi = searchTerm
            ? provinsi.filter((item) =>
                  item.label.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : provinsi; // view all provinces if not in search

      // Grouping provinces based on initial letters
      const groupedProvinsi = filteredProvinsi.reduce((groups, item) => {
            const firstLetter = item.label.charAt(0).toUpperCase();
            if (!groups[firstLetter]) {
                  groups[firstLetter] = [];
            }
            groups[firstLetter].push(item);
            return groups;
      }, {} as Record<string, { value: string; label: string }[]>);

      return (
            <div
                  className={`fixed inset-0 ${isMobile ? "flex justify-end items-end" : "bg-black bg-opacity-50 px-2 flex items-center justify-center"
                        } z-50`}
                  onClick={handleClickOutside}
            >
                  <div
                        className={`${isMobile
                              ? "w-full h-fit flex flex-col justify-between pb-5 bg-white"
                              : "bg-white rounded-xl p-5 shadow-md w-[500px] h-auto"
                              }`}
                        onClick={(e) => e.stopPropagation()}
                  >
                        {/* Header */}
                        <div className="flex flex-col gap-4">
                              <HeaderPopupFilter title="Lokasi" onClose={onClose} />

                              <div className="flex flex-col gap-4 px-5 md:px-0">
                                    {/* Search Input */}
                                    <InputSearchLocation value={searchTerm} onChange={handleSearch} />

                                    {/* List Provinsi */}
                                    <div className="max-h-[450px] overflow-y-auto">
                                          {Object.entries(groupedProvinsi).map(([letter, items]) => (
                                                <div key={letter} className="mb-4">
                                                      {/* Huruf Awal */}
                                                      <div className="text-sm font-bold text-neutral-700 mb-2">{letter}</div>
                                                      {/* Daftar Provinsi */}
                                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
                                                            {items.map((item) => (
                                                                  <div key={item.value} className="flex items-center gap-2">
                                                                        <input
                                                                              type="checkbox"
                                                                              id={item.value}
                                                                              value={item.value}
                                                                              checked={selectedLocations.includes(item.value)}
                                                                              onChange={() => handleCheckboxChange(item.value)}
                                                                        />
                                                                        <label htmlFor={item.value} className="text-sm font-normal text-neutral-700 ">
                                                                              {item.label}
                                                                        </label>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>

                        </div>

                        <hr  className="border-neutral-400 my-3 px-5"/>
                        {/* Footer */}
                        <div className="flex md:justify-end items-center gap-3 text-sm px-5">
                              <button
                                    className="w-full md:w-fit px-6 py-2 border border-neutral-400 rounded-3xl text-neutral-700"
                                    onClick={() => setSelectedLocations([])}
                              >
                                    Reset
                              </button>
                              <button
                                    className="w-full md:w-fit px-6 py-2 bg-primary-500 text-white rounded-3xl"
                                    onClick={onClose}
                              >
                                    Terapkan
                              </button>
                        </div>
                  </div>
            </div>
      );
}
