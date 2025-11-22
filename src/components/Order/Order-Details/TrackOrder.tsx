import { Order } from "@/lib/api/fetch-order";

interface OrderInvoiceProps {
      order: Order;
      stepIndex: number;
      currentStep: number;
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

const StatusDelivery = ({ order, stepIndex, currentStep }: OrderInvoiceProps) => {
      const isActive = stepIndex <= currentStep; // Status aktif jika langkah lebih kecil/sama dengan langkah saat ini

      return (
            <div className="-ms-1.5 inline-flex gap-3 items-start justify-start">
                  <div className={`rounded-full w-3 h-3 mt-1 z-30 ${isActive ? "bg-primary-500" : "bg-neutral-400"}`}></div>
                  <div
                        className={`flex flex-col gap-2 ${isActive ? "text-primary-500" : "text-neutral-500"
                              } text-sm`}
                  >
                        <p className="font-bold">
                              {stepIndex === 0 && "Pesanan dibuat"}
                              {stepIndex === 1 && "Sedang Dikemas"}
                              {stepIndex === 2 && "Dikirim"}
                              {stepIndex === 3 && "Dalam Perjalanan"}
                              {stepIndex === 4 && "Pesanan Selesai"}
                        </p>
                        <p>{formatDate(order.createdDate)}</p>
                  </div>
            </div>
      );
};

export function TrackOrder({ order }: { order: Order }) {
      // Map API processStatus to step number
      const statusToStep: Record<string, number> = {
            'PENDING_PAYMENT': 0,
            'PAID': 1,
            'PROCESSING': 1,
            'SHIPPED': 2,
            'IN_TRANSIT': 3,
            'DELIVERED': 4,
            'CANCELLED': 0
      };
      
      const currentStep = statusToStep[order.processStatus] || 0;

      return (
            <div className="flex flex-col bg-white p-5 gap-5 rounded-xl shadow-md">
                  <h4 className="text-lg font-extrabold text-neutral-700">Lacak Pesanan</h4>
                  <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-5 z-30 border-l border-l-neutral-400 border-dashed">
                              {[0, 1, 2, 3, 4].map((stepIndex) => (
                                    <StatusDelivery
                                          key={stepIndex}
                                          order={order}
                                          stepIndex={stepIndex}
                                          currentStep={currentStep}
                                    />
                              ))}
                        </div>
                  </div>
            </div>
      );
}
