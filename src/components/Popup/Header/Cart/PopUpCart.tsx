import Image from "next/image";
import { productsData } from "@/lib/product-data";
import Link from "next/link";

export function PopupCart() {
      const ProductsAtChart = productsData.slice(0, 4);
      return (
            <div className="z-50 bg-white p-6 shadow-md rounded-lg absolute gap-5 w-[520px]">
                  {/* PopUp Cart Fill */}
                  <div className="flex flex-col">
                        <div className="flex flex-row justify-between gap-40 items-center whitespace-nowrap">
                              <p className="text-lg text-neutral-700 font-bold">Keranjang ({ProductsAtChart.length})</p>
                              <Link href="/cart" passHref>
                                    <p className="text-sm font-semibold text-primary-500 hover:underline">Lihat Semua</p>
                              </Link>
                        </div>
                        <div className="border-t-[1px] border-dashed border-neutral-400 my-2"></div>
                        {ProductsAtChart.slice(0, 4).map((item) => (
                              <div className="flex flex-col" key={item.id}>
                                    <div className="flex flex-row justify-between w-full">
                                          <div className="flex flex-row gap-3">
                                                <Image src={item.image} alt={item.title} width={60} height={60} className="w-[60px] rounded-lg" />
                                                <div>
                                                      <p className="text-sm text-neutral-700 whitespace-nowrap">{item.title}</p>
                                                      <p className="text-sm text-neutral-600">2 Barang</p>
                                                </div>
                                          </div>
                                          <div className="flex items-center text-right">
                                                      <p className="font-extrabold text-base text-neutral-700 whitespace-nowrap">{item.price}</p>
                                                </div>
                                    </div>
                                    <div className="border-t-[1px] border-dashed border-neutral-400 my-2"></div>
                              </div>
                        ))}
                  </div>

                  {/* PopUp Cart Empty */}
                  <div className="hidden flex-col">
                        <p className="text-lg text-neutral-700 font-bold">Keranjang (0)</p>
                        <div className="border-t-[1px] border-dashed border-neutral-400 my-2"></div>
                        <div className="flex flex-col items-center justify-center p-3">
                              <Image src="/image/popup/cart-empty.svg" alt="cart-empty" width={140} height={169} />
                              <p className="font-bold text-sm text-neutral-700 mt-5">Keranjang masih kosong</p>
                              <p className="text-neutral-700 text-sm">Yuk, cari barang yang kamu inginkan</p>
                        </div>
                  </div>
            </div>
      )
}