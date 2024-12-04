import { OrderCardType } from "@/types/order-card"
import { LuCalendarDays } from "react-icons/lu";

interface OrderInvoiceProps {
      order: OrderCardType;
}

export function OrderInvoice({ order }: OrderInvoiceProps) {
      return (
            <div className="flex flex-row justify-between items-center rounded-xl p-5 shadow-md w-full">
                  <div className="flex flex-col gap-4">
                        <div className="inline-flex items-center gap-4">
                              <p className="text-sm text-neutral-700">No. Pesanan: <span className="text-lg font-extrabold">&nbsp;&nbsp;{order.number_invoice} </span></p>
                              <LuCalendarDays size={20} color="#000000" />
                              <p>{order.date}</p>
                        </div>
                        <p className="text-sm text-neutral-700">Status: &nbsp;&nbsp;<span className="bg-info-100 p-2 rounded-[12px] text-info-300 font-semibold text-xs">{order.status}</span></p>
                  </div>
            </div>
      )
}