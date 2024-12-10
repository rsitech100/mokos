import Image from "next/image";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

export function SellerInfo() {
      return (
            <div className="flex flex-col">
                  <div className="inline-flex justify-between items-center p-4">
                        <div className="inline-flex gap-2">
                              <div className="rounded-full border border-neutral-400">
                                    <Image src="/image/detail-product/shoes-dummy.svg" alt="shoes-dummy" width={54} height={54} />
                              </div>
                              <div className="flex flex-col gap-1 text-sm justify-center">
                                    <div className="inline-flex font-bold text-neutral-700 gap-1.5">
                                          Toko Sepatu
                                          <RiVerifiedBadgeFill color="#315879" size={20} />
                                    </div>
                                    <p className="text-neutral-600">Bergabung 1  hari yang lalu</p>
                              </div>
                        </div>
                        <div className="border border-neutral-400 bg-neutral-100 flex items-center justify-center gap-1.5 py-2 px-14 rounded-2xl">
                              <FaWhatsapp color="#191717" size={16} />
                              <p className="text-sm text-neutral-700 font-semibold">Chat</p>
                        </div>
                  </div>
                  <hr className="border-neutral-400 w-full " />
                  <div className="inline-flex items-center p-4 gap-1.5">
                        <IoLocationOutline size={16} color="#191717" />
                        <p className="text-sm text-neutral-700 font-semibold">Lokasi Toko: <span className="font-normal">Jakarta Barat</span></p>
                  </div>
                  <hr className="border-neutral-400 w-full " />
            </div>
      )
}