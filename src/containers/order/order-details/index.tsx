import Link from "next/link";
import { OrderInvoice } from "@/components/Order/Order-Details/OrderInvoice";
import { IoArrowBack } from "react-icons/io5";
import { OrderCardType } from "@/types/order-card";
import { TrackOrder } from "@/components/Order/Order-Details/TrackOrder";
import { DetailProduct } from "@/components/Order/Order-Details/DetailProduct";
import { InfoSellerAndDelivery } from "@/components/Order/Order-Details/InfoSellerAndDelivery";

interface OrderDetailsSectionProps {
      order: OrderCardType;
}

export function OrderDetailsSection({ order }: OrderDetailsSectionProps) {
      return (
            <main className="flex flex-col w-full gap-6">
                  <div className="inline-flex gap-3 items-center">
                        <Link href="/order" passHref>
                              <IoArrowBack color="#000000" size={24} />
                        </Link>
                        <h2 className="font-extrabold text-2xl text-neutral-700">Detail Pesanan</h2>
                  </div>
                  <div className="flex flex-col gap-5 w-full">
                        <OrderInvoice order={order} />
                        <div className="flex flex-row gap-5 w-full">
                              <div className="flex flex-col gap-5 w-full">
                                    <TrackOrder order={order} />
                                    <DetailProduct />
                              </div>
                              <InfoSellerAndDelivery />
                        </div>
                  </div>
            </main>
      )
}