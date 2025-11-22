'use client';
import { useState } from "react";

type OrderNavigationType = {
      title: string;
      status: string;
};

const OrderNavigationItems: OrderNavigationType[] = [
      { title: "Semua", status: "" },
      { title: "Belum Bayar", status: "PENDING_PAYMENT" },
      { title: "Sudah Bayar", status: "PAID" },
      { title: "Diproses", status: "PROCESSING" },
      { title: "Dikirim", status: "SHIPPED" },
      { title: "Selesai", status: "DELIVERED" },
      { title: "Dibatalkan", status: "CANCELLED" },
];

interface OrderBarProps {
      onStatusChange: (status: string) => void;
}

export function OrderBar({ onStatusChange }: OrderBarProps) {
      const [activeStatus, setActiveStatus] = useState("");

      const handleStatusClick = (status: string) => {
            setActiveStatus(status);
            onStatusChange(status);
      };

      return (
            <div className="flex flex-col overflow-hidden">
                  {/* Wrapper for scrolling */}
                  <div className="flex flex-row gap-8 justify-start lg:justify-around overflow-x-auto w-full scrollbar-hide">
                        {OrderNavigationItems.map((item) => (
                              <button
                                    key={item.title}
                                    onClick={() => handleStatusClick(item.status)}
                                    className={`text-sm whitespace-nowrap pb-2 transition-colors ${
                                          activeStatus === item.status
                                                ? "text-primary-500 font-semibold border-b-2 border-primary-500"
                                                : "text-neutral-700"
                                    }`}
                              >
                                    {item.title}
                              </button>
                        ))}
                  </div>
                  <div className="h-[1px] w-full bg-neutral-400"></div>
            </div>
      );
}
