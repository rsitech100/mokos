import { Order } from "@/lib/api/fetch-order";
import { LuCalendarDays } from "react-icons/lu";

interface OrderInvoiceProps {
      order: Order;
}

const formatDate = (timestamp: number) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString('id-ID', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
      });
};

const getStatusLabel = (status: string) => {
      const statusMap: Record<string, string> = {
            'PENDING_PAYMENT': 'Menunggu Pembayaran',
            'PAID': 'Dibayar',
            'PROCESSING': 'Sedang Diproses',
            'SHIPPED': 'Dikirim',
            'DELIVERED': 'Selesai',
            'CANCELLED': 'Dibatalkan'
      };
      return statusMap[status] || status;
};

export function OrderInvoice({ order }: OrderInvoiceProps) {
      return (
            <div className="flex flex-row flex-wrap justify-between items-center rounded-xl p-5 gap-5 shadow-md w-full">
                  <div className="flex flex-col gap-4">
                        <div className="inline-flex flex-col md:flex-row items-start md:items-center gap-4 text-neutral-700 text-sm">
                              <p className="text-sm ">No. Pesanan:</p>
                              <p className="text-smtext-lg font-extrabold">{order.orderNumber} </p>
                              <div className="inline-flex gap-2">
                              <LuCalendarDays size={20} color="#000000" />
                              <p>{formatDate(order.createdDate)}</p>
                              </div>
                        </div>
                        <p className="text-sm text-neutral-700">Status: &nbsp;&nbsp;<span className="bg-info-100 p-2 rounded-[12px] text-info-300 font-semibold text-xs">{getStatusLabel(order.processStatus)}</span></p>
                  </div>
                        <button className="border border-neutral-400 py-2 px-4 rounded-3xl font-semibold text-sm w-full md:w-fit">Cetak Invoice</button>
            </div>
      )
}