'use client';

import { useState } from "react";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
} from "@/components/ui/select";
import Image from "next/image";

interface ShippingOption {
      id: string;
      name: string;
      cost: number;
      estimatedDays: string;
}

interface ShippingSelectorProps {
      shippings?: ShippingOption[];
      selectedShippingId?: string;
      onShippingChange: (shippingId: string, shippingName: string) => void;
}

export function ShippingSelector({
      shippings = [],
      selectedShippingId,
      onShippingChange,
}: ShippingSelectorProps) {

      const [selectedLabel, setSelectedLabel] = useState<string>("Pilih Pengiriman");

      const handleSelect = (shippingId: string) => {
            const shipping = shippings.find((s) => s.id === shippingId);
            if (shipping) {
                  setSelectedLabel(shipping.name);
                  onShippingChange(shippingId, shipping.name);
            }
      };

      return (
            <div className="mt-4">
                  <Select onValueChange={handleSelect} value={selectedShippingId}>
                        <SelectTrigger className="inline-flex justify-between border border-neutral-400 py-5 px-3 w-full rounded-[12px] items-center">
                              <div className="inline-flex gap-3 items-center">
                                    <Image
                                          src="/image/checkout/truck.svg"
                                          alt="truck-icon"
                                          width={24}
                                          height={24}
                                    />
                                    <p className="font-semibold text-neutral-700 text-sm">
                                          {selectedLabel}
                                    </p>
                              </div>
                        </SelectTrigger>

                        <SelectContent>
                              {shippings.length === 0 ? (
                                    <SelectItem value="none" disabled>
                                          <p className="text-neutral-500 text-sm">Tidak ada opsi pengiriman</p>
                                    </SelectItem>
                              ) : (
                                    shippings.map((shipping) => (
                                          <SelectItem key={shipping.id} value={shipping.id}>
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
                                                                        {shipping.name}
                                                                  </p>
                                                                  <p className="text-sm text-neutral-600">
                                                                        {shipping.estimatedDays}
                                                                  </p>
                                                            </div>
                                                      </div>

                                                      <p className="font-extrabold text-neutral-700 text-sm">
                                                            Rp{shipping.cost.toLocaleString("id-ID")}
                                                      </p>
                                                </div>
                                          </SelectItem>
                                    ))
                              )}
                        </SelectContent>
                  </Select>
            </div>
      );
}
