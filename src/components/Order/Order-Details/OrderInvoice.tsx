import { OrderCardType } from "@/types/order-card"
import { LuCalendarDays } from "react-icons/lu";

interface OrderInvoiceProps {
      order: OrderCardType;
}

export function OrderInvoice({ order }: OrderInvoiceProps) {
      return (
            <div className="flex flex-row flex-wrap justify-between items-center rounded-xl p-5 gap-5 shadow-md w-full">
                  <div className="flex flex-col gap-4">
                        <div className="inline-flex flex-col md:flex-row items-start md:items-center gap-4 text-neutral-700 text-sm">
                              <p className="text-sm ">No. Pesanan:</p>
                              <p className="text-smtext-lg font-extrabold">{order.number_invoice} </p>
                              <div className="inline-flex gap-2">
                              <LuCalendarDays size={20} color="#000000" />
                              <p>{order.date}</p>
                              </div>
                        </div>
                        <p className="text-sm text-neutral-700">Status: &nbsp;&nbsp;<span className="bg-info-100 p-2 rounded-[12px] text-info-300 font-semibold text-xs">{order.status}</span></p>
                  </div>
                        <button className="border border-neutral-400 py-2 px-4 rounded-3xl font-semibold text-sm w-full md:w-fit">Cetak Invoice</button>
            </div>
      )
}