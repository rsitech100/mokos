"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
// import { FaStar } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { StarRating } from "./StarRating";
import { PhotoUploader } from "./PhotoUploader";

interface PopupWriteReviewProps {
      onClose: () => void;
}


export function PopupWriteReview({ onClose }: PopupWriteReviewProps) {
      const [rating, setRating] = useState(0);
      const [isMobile, setIsMobile] = useState(false);
      const [photos, setPhotos] = useState<File[]>([]);
      // const [formData, setFormData] = useState('');

      // Cek apakah tampilan adalah mobile
      useEffect(() => {
            const handleResize = () => {
                  setIsMobile(window.innerWidth <= 768);
            };
            handleResize(); // Cek saat komponen pertama kali dirender
            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
      }, []);

      // const handleSubmit = () => {
      //       onSave(formData); // Pass updated data to parent
      // };

      return (
            <div
                  className={`fixed inset-0 flex items-center justify-center ${isMobile ? "bg-white" : "bg-black bg-opacity-50 px-2"
                        } z-50`}
            >
                  <div
                        className={`${isMobile
                              ? "w-full h-full flex flex-col justify-between pb-5"
                              : "bg-white rounded-xl p-5 shadow-md w-[500px] h-[380px]"
                              }`}
                  >
                        <div className="flex flex-col gap-6 overflow-y-auto h-full ">

                              {/* Header */}
                              <div className="inline-flex w-full justify-start items-center md:justify-between shadow-md md:shadow-none p-5 md:p-0 gap-3 md:gap-0 text-neutral-700">
                                    <div onClick={onClose} 
                                    className="flex md:hidden cursor-pointer">
                                          <FaArrowLeft size={14} color="#00000" />
                                    </div>
                                    <h3 className="text-lg font-extrabold mb-0 text-center">
                                          Beri Ulasan
                                    </h3>
                                    <div
                                          onClick={onClose}
                                          className="hidden md:flex cursor-pointer md:items-center md:justify-center"
                                    >
                                          <IoClose size={24} color="#00000" />
                                    </div>
                              </div>

                              {/* form review */}
                              <div className="flex flex-col gap-6  px-5 md:px-0">
                                    <div className="flex flex-row gap-3">
                                          <Image src="/image/product/shoes-dummy.svg" alt="shoes-dummy" width={60} height={60} className="rounded-[12px]" />
                                          <div className="flex flex-col gap-1 text-sm text-neutral-700 justify-center text-left">
                                                <p className="font-normal">Sepatu Hitam Bagus dan Berkualitas</p>
                                                <p className="font-extrabold">Rp100.000</p>
                                          </div>
                                    </div>

                                    <hr className="border-dashed border-neutral-400" />

                                    {/* Rate Product with Icon Star */}
                                    <div className="flex flex-col gap-2 items-center justify-center">
                                          <p className="font-semibold text-sm text-neutral-700">Beri Penilaian Produk</p>
                                          <StarRating onRatingChange={setRating} />
                                    </div>

                                    {/* Rate Product with Description */}
                                    <div className="flex flex-col gap-2 w-full items-start text-left">
                                          <p className="text-sm text-neutral-700 font-semibold">Tulis Ulasan</p>
                                          <textarea
                                                className="rounded-[12px] border border-neutral-400 p-2 w-full"
                                                rows={5}
                                                placeholder="Berikan Ulasan Kami"
                                          ></textarea>
                                    </div>

                                    {/* Rate Product with Upload Photo */}
                                    <div className="flex flex-col gap-3 items-start text-left">
                                                <p className="text-sm text-neutral-700 font-semibold">Foto</p>
                                                <PhotoUploader onPhotosChange={setPhotos} />
                                    </div>


                                    {/* checkbox for hide username */}
                                    <div className="inline-flex gap-1.5">
                                          <input type="checkbox" className="w-5 h-5" />
                                          <p className="text-xs sm:text-sm text-neutral-700 font-normal">Sembunyikan nama</p>
                                    </div>

                                    <button className="w-full bg-primary-500 text-neutral-100 py-2 font-semibold text-sm rounded-3xl">Beri Ulasan</button>
                              </div>
                        </div>
                  </div>
            </div>
      )
}