'use client';
import { useState } from "react";
import { Product } from "@/types/cart";
import Image from "next/image";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useCartContext } from "@/context/CartContext";

interface CartCardProps {
      storeName: string;
      storeId: number;
      products: Product[];
}

export function CartCard({ storeName, storeId, products }: CartCardProps) {
      const { updateProductSelection, cartItems } = useCartContext();
      // State untuk checkbox utama
      const [isStoreSelected, setIsStoreSelected] = useState(false);

      // Fungsi untuk mengontrol semua checkbox dalam toko
      const toggleAllProducts = (isSelected: boolean) => {
            setIsStoreSelected(isSelected);
            products.forEach((product) => {
                  updateProductSelection(storeId, product.id, isSelected);
            });
      };

      return (
            <div className="bg-neutral-100 rounded-[12px] shadow-md gap-5 p-5 flex flex-col">
                  {/* Store Name */}
                  <div className="inline-flex gap-1.5 items-center">
                        <input
                              type="checkbox"
                              className="w-5 h-5"
                               checked={isStoreSelected}
                              onChange={(e) => toggleAllProducts(e.target.checked)}
                        />
                        <p className="font-bold text-xs sm:text-sm text-neutral-700">{storeName}</p>
                  </div>

                  {/* Product List */}
                  <div className="flex flex-col gap-5">
                        {products.map((item, index) => {
                              const cartItem = cartItems.find(cart => cart.id === storeId);
                              const selectedProduct = cartItem?.products.find(p => p.id === item.id);

                              return (
                                    <div key={item.id}>
                                          <div className="flex flex-col md:flex-row gap-3 justify-between">
                                                <div className="flex flex-row gap-3">
                                                      <input
                                                            className="w-5 h-5 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                                                            type="checkbox"
                                                            // Gunakan state isSelected dari cartItems
                                                            checked={selectedProduct?.isSelected || false}
                                                            onChange={() => {
                                                                  console.log('Checkbox clicked', { storeId, itemId: item.id });
                                                                  updateProductSelection(storeId, item.id);
                                                            }}
                                                      />
                                                      <div className="flex flex-row gap-3">
                                                            <Image src={item.imageUrl} alt={item.name} width={60} height={60} />
                                                            <div className="flex flex-col gap-[3px] text-xs sm:text-sm text-neutral-700">
                                                                  <p className="font-semibold">{item.name}</p>
                                                                  <p className="block md:hidden font-extrabold text-xs text-neutral-700">Rp{item.price}</p>
                                                                  <p>{item.category}</p>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="flex flex-col gap-5 text-right">
                                                      <p className="hidden md:block font-extrabold text-base text-neutral-700">Rp{item.price}</p>
                                                      <div className="inline-flex gap-5 justify-end">
                                                            <Image src="/image/cart/delete.png" alt="delete" width={24} height={24} />
                                                            <div className="inline-flex gap-4">
                                                                  <div
                                                                        className="w-6 h-6 flex justify-center items-center bg-neutral-400 rounded-full p-2 cursor-pointer"
                                                                  // onClick={() => updateProductSelection(storeId, item.id, item.quantity - 1)}
                                                                  >
                                                                        <FaMinus color="#315879" />
                                                                  </div>
                                                                  <span className="text-base">{item.quantity}</span>
                                                                  <div
                                                                        className="w-6 h-6 flex justify-center items-center bg-primary-500 rounded-full p-2 cursor-pointer"
                                                                  // onClick={() => updateProductSelection(storeId, item.id, item.quantity + 1)}
                                                                  >
                                                                        <FaPlus color="#ffffff" />
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                          {index < products.length - 1 && (
                                                <hr className="border-dashed border-neutral-400 my-2" />
                                          )}
                                    </div>
                              )
                        })}
                  </div>
            </div>
      );
}