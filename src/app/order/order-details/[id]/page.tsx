'use client';
import { OrderDetailsSection } from "@/containers/order/order-details";
import { getOrderDetail } from "@/lib/api/fetch-order";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Order } from "@/lib/api/fetch-order";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        const response = await getOrderDetail(id);
        
        if (response.success && response.data) {
          setOrder(response.data);
        } else {
          setError('Order tidak ditemukan');
        }
      } catch (err) {
        console.error('Error loading order detail:', err);
        setError('Gagal memuat detail pesanan');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="flex flex-col py-10 lg:px-20 max-w-[1440px] w-full mx-auto px-5">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="h-40 bg-gray-300 rounded"></div>
          <div className="h-60 bg-gray-300 rounded"></div>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="flex flex-col py-10 lg:px-20 max-w-[1440px] w-full mx-auto px-5">
        <p className="text-center text-neutral-700">{error || 'Order tidak ditemukan'}</p>
      </main>
    );
  }

  return <OrderDetailsSection order={order} />;
}
