'use client';
import { useState } from "react";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
} from "@/components/ui/select";
import Image from "next/image";
import { shippingData } from "@/lib/shipping-data";

export function PopupSelectShipping() {
      const [selectedShipping, setSelectedShipping] = useState<string | null>(null);

      const handleSelect = (value: string) => {
            setSelectedShipping(value);
      };

      return (
            <div className="w-full">
                  <Select onValueChange={handleSelect}>
                        <SelectTrigger className="inline-flex justify-between border border-neutral-400 py-5 px-3 w-full rounded-[12px] items-center">
                              <div className="inline-flex gap-3 items-center">
                                    <Image
                                          src="/image/checkout/truck.svg"
                                          alt="truck-icon"
                                          width={24}
                                          height={24}
                                    />
                                    <p className="font-semibold text-neutral-700 text-sm">
                                          {selectedShipping || "Pilih Pengiriman"}
                                    </p>
                              </div>
                        </SelectTrigger>

                        <SelectContent>
                              {shippingData.map((shipping) => (
                                    <SelectItem
                                          key={shipping.id}
                                          value={shipping.label}
                                          className="relative w-full"
                                    >
                                          <div className="flex justify-between gap-10 items-center w-full">
                                                <div className="flex flex-row gap-3">
                                                      <Image
                                                            src="/image/checkout/truck.svg"
                                                            alt="truck-icon"
                                                            width={24}
                                                            height={24}
                                                      />
                                                      <div className="flex flex-col gap-1">
                                                            <p className="font-semibold text-sm text-neutral-700">
                                                                  {shipping.label}
                                                            </p>
                                                            <p className="text-sm text-neutral-600">
                                                                  {shipping.description}
                                                            </p>
                                                      </div>
                                                </div>

                                                <p className="font-extrabold text-neutral-700 text-sm">
                                                      Rp{shipping.price.toLocaleString("id-ID")}
                                                </p>
                                          </div>
                                    </SelectItem>
                              ))}
                        </SelectContent>
                  </Select>
            </div>
      );
}
