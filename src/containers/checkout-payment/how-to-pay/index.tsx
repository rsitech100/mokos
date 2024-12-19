'use client';
import Link from "next/link";
import { useCountdown, formatTime } from "@/utils/timer";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import Image from "next/image";

export function HowToPay() {
      const initialTime = 86400; // 24 jam dalam detik
      const timeLeft = useCountdown(initialTime); // Menggunakan custom hook
      const { hours, minutes, seconds } = formatTime(timeLeft); // Format waktu

      return (
            <section className="bg-white flex flex-col gap-4 justify-center shadow-md rounded-[12px] py-10 px-5 text-center max-w-[600px] w-full">
                  <p className="text-sm text-neutral-700 text-center max-w-[315px] mx-auto">
                        Mohon selesaikan pembayaran anda sebelum
                        <span className="font-bold"> Senin, 11 Nov 2024, 13:54 WIB.</span>
                  </p>
                  <div className="inline-flex gap-2.5 items-center justify-center text-lg md:text-xl font-extrabold">
                        <MdOutlineWatchLater size={24} color="#191717" />
                        <span>{String(hours).padStart(2, "0")} :</span>
                        <span>{String(minutes).padStart(2, "0")} :</span>
                        <span>{String(seconds).padStart(2, "0")}</span>
                  </div>

                  <hr className="border-dashed border-neutral-400" />

                  {/* Number Virtual Account */}
                  <div className="flex flex-col gap-2 md:gap-4 items-center justify-center">
                        <p className="text-neutral-700 text-xs md:text-sm">Nomor Virtual Account</p>
                        <div className="inline-flex gap-4 font-extrabold text-lg md:text-xl text-neutral-700">
                              <h3>2319</h3>
                              <h3>0852</h3>
                              <h3>3712</h3>
                              <h3>1230</h3>
                              <span>
                                    <IoCopyOutline size={24} color="#191717" />
                              </span>
                        </div>
                  </div>

                  <hr className="border-dashed border-neutral-400" />

                  {/* Bank Account and Total Bill */}
                  <div className="flex flex-row gap-6 items-center justify-center">
                        <div className="flex flex-row gap-3 items-center">
                              <div className="border border-neutral-400 p-2 rounded-md w-12 h-12 md:w-[60px] md:h-[60px]">
                                    <Image
                                          src="/image/payment/bni.svg"
                                          alt="BNI Virtual Account"
                                          width={50}
                                          height={15}
                                          className="w-full h-full"
                                    />
                              </div>
                              <p className="text-xs md:text-base text-neutral-700 font-semibold">BNI Virtual Account</p>
                        </div>

                        <div className="border border-neutral-400 h-[56px]"></div>

                        <div className="flex flex-col gap-1 text-center">
                              <p className="text-xs md:text-sm text-neutral-700">Total Tagihan</p>
                              <p className="text-sm md:text-base font-extrabold text-neutral-700">Rp810.000</p>
                        </div>
                  </div>
                  <hr className="border-dashed border-neutral-400" />

                  {/* Buttons */}
                  <div className="flex flex-col md:flex-row w-full gap-4 md:gap-1.5">
                        <Link
                              href="/order"
                              className="w-full md:w-1/2 border border-primary-500 rounded-3xl text-primary-500 py-3 text-sm font-semibold flex items-center justify-center"
                              passHref>
                              Lihat Daftar Pesanan
                        </Link>
                        <Link
                              href="/"
                              className="w-full md:w-1/2 bg-primary-500 rounded-3xl text-neutral-100 py-3 text-sm font-semibold flex items-center justify-center"
                              passHref>
                              Belanja Lagi
                        </Link>
                  </div>
            </section>
      );
}
