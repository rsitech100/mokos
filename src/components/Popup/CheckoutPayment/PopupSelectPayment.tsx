'use client';
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { paymentData } from "@/lib/payment-data";
import Link from "next/link";

interface PopupSelectPaymentProps {
      onClose: () => void;
}

export function PopupSelectPayment({ onClose }: PopupSelectPaymentProps) {
      const [isMobile, setIsMobile] = useState(false);
      const [selectedPayment, setSelectedPayment] = useState<number | null>(null);

      // Cek apakah tampilan adalah mobile
      useEffect(() => {
            const handleResize = () => {
                  setIsMobile(window.innerWidth <= 768);
            };
            handleResize(); // Cek saat komponen pertama kali dirender
            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
      }, []);

      const handleSelectPayment = (id: number) => {
            setSelectedPayment(id);
      };

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
                        <div className="flex flex-col gap-6 overflow-y-auto h-full">

                              {/* Header */}
                              <div className="inline-flex w-full justify-start items-center md:justify-between shadow-md md:shadow-none p-5 md:p-0 gap-3 md:gap-0 text-neutral-700">
                                    <div onClick={onClose} className="flex md:hidden cursor-pointer">
                                          <FaArrowLeft size={14} color="#00000" />
                                    </div>
                                    <h3 className="text-lg font-extrabold mb-0 text-center">
                                          Pilih Pembayaran
                                    </h3>
                                    <div
                                          onClick={onClose}
                                          className="hidden md:flex cursor-pointer md:items-center md:justify-center"
                                    >
                                          <IoClose size={24} color="#00000" />
                                    </div>
                              </div>

                              {/* List Payment */}
                              <div className="space-y-4 px-5 md:px-0">
                                    {paymentData.map((payment) => (
                                          <label
                                                key={payment.id}
                                                className={`flex items-center justify-between p-4 cursor-pointer ${selectedPayment === payment.id
                                                      ? "border border-blue-500 bg-blue-50 rounded-lg"
                                                      : "border-b border-b-neutral-400"
                                                      }`}
                                          >
                                                <div className="flex items-center gap-3">
                                                      <div className="border border-neutral-400 p-2 rounded-md w-[60px] h-[60px]">
                                                            <Image
                                                                  src={payment.image}
                                                                  alt={payment.label}
                                                                  width={50}
                                                                  height={15}
                                                                  className="w-full h-full"
                                                            />
                                                      </div>
                                                      <span className="text-base font-semibold text-neutral-700">
                                                            {payment.label}
                                                      </span>
                                                </div>
                                                <input
                                                      type="radio"
                                                      name="payment"
                                                      checked={selectedPayment === payment.id}
                                                      onChange={() => handleSelectPayment(payment.id)}
                                                      className="w-5 h-5 text-primary-500 focus:ring-primary-500"
                                                />
                                          </label>
                                    ))}
                              </div>

                              {/* Total & Button */}
                              <div className="inline-flex justify-between w-full px-5">
                                    <div className="flex flex-col gap-1">
                                          <p className="text-sm text-neutral-670">Total Belanja</p>
                                          <p className="text-base font-extrabold text-neutral-700">
                                                Rp810.000
                                          </p>
                                    </div>
                                    <Link href="/pay" passHref>
                                          <button
                                                className="w-fit px-14 md:px-16 bg-primary-500 text-white font-semibold py-2 rounded-3xl hover:bg-primary-400  text-sm transition"
                                                disabled={!selectedPayment}
                                          >
                                                Bayar
                                          </button>
                                    </Link>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
