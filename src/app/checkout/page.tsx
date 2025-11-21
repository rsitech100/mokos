'use client';
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCheckout, updateShipping, updatePayment, CheckoutGroup } from "@/lib/api/fetch-checkout";
import { createOrder } from "@/lib/api/fetch-order";
import toast from "react-hot-toast";
import { AddressCard } from "@/components/CheckoutPayment/AddressCard";
import { MerchantCheckoutCard } from "@/components/CheckoutPayment/MerchantCheckoutCard";
import { PaymentMethodSelector } from "@/components/CheckoutPayment/PaymentMethodSelector";
import { CheckoutSummary } from "@/components/CheckoutPayment/CheckoutSummary";

function CheckoutContent() {
      const router = useRouter();
      const searchParams = useSearchParams();
      const checkoutGroupId = searchParams.get('id');

      const [checkout, setCheckout] = useState<CheckoutGroup | null>(null);
      const [loading, setLoading] = useState(true);
      const [processingOrder, setProcessingOrder] = useState(false);

      const loadCheckout = async () => {
            if (!checkoutGroupId) return;

            try {
                  setLoading(true);
                  const response = await getCheckout(checkoutGroupId);
                  console.log('Checkout response:', response);
                  console.log('Checkout data:', response.data);
                  if (response.success) {
                        setCheckout(response.data);
                  }
            } catch (error) {
                  console.error('Error loading checkout:', error);
                  toast.error('Gagal memuat checkout');
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            if (checkoutGroupId) {
                  loadCheckout();
            } else {
                  setLoading(false);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [checkoutGroupId]);

      const handleShippingChange = async (checkoutId: string, shippingId: string, shippingServiceName: string) => {
            try {
                  const response = await updateShipping({
                        checkoutId,
                        shippingId,
                        shippingServiceName
                  });
                  if (response.success) {
                        await loadCheckout();
                        toast.success('Metode pengiriman diperbarui');
                  }
            } catch (error) {
                  console.error('Shipping error:', error);
                  toast.error('Gagal memperbarui pengiriman');
            }
      };

      const handlePaymentChange = async (paymentMethodId: string) => {
            if (!checkoutGroupId) return;

            try {
                  const response = await updatePayment({
                        checkoutGroupId,
                        paymentMethodId
                  });
                  if (response.success) {
                        await loadCheckout();
                        toast.success('Metode pembayaran diperbarui');
                  }
            } catch (error) {
                  console.error('Payment error:', error);
                  toast.error('Gagal memperbarui pembayaran');
            }
      };

      const handleCreateOrder = async () => {
            if (!checkoutGroupId) return;

            setProcessingOrder(true);
            try {
                  const response = await createOrder(checkoutGroupId);
                  if (response.success) {
                        toast.success('Pesanan berhasil dibuat');
                        router.push(`/pay?orderId=${response.data.id}`);
                  }
            } catch (error) {
                  console.error('Error creating order:', error);
                  toast.error('Gagal membuat pesanan');
            } finally {
                  setProcessingOrder(false);
            }
      };

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

      if (!checkout) {
            return (
                  <main className="flex flex-col py-10 lg:px-20 max-w-[1440px] w-full mx-auto px-5">
                        <p className="text-center text-neutral-700">Checkout tidak ditemukan</p>
                  </main>
            );
      }

      return (
            <main className="flex flex-col md:flex-row gap-10 py-10 lg:px-20 max-w-[1440px] w-full mx-auto px-5">
                  <section className="flex flex-col gap-6 flex-1">
                        <h2 className="text-neutral-700 font-extrabold text-lg md:text-2xl">Pengiriman</h2>

                        {/* Address */}
                        <AddressCard 
                              address={checkout.toAddress}
                              onAddAddress={() => router.push('/address')}
                        />

                        {/* Products by Merchant */}
                        {checkout.productsCheckout && checkout.productsCheckout.length > 0 ? (
                              checkout.productsCheckout.map((merchant) => (
                                    <MerchantCheckoutCard
                                          key={merchant.merchantId}
                                          merchant={merchant as never}
                                          onShippingChange={handleShippingChange}
                                    />
                              ))
                        ) : (
                              <div className="bg-white rounded-lg shadow-md p-5">
                                    <p className="text-center text-neutral-500">Tidak ada produk</p>
                              </div>
                        )}

                        {/* Payment Method */}
                        <PaymentMethodSelector
                              paymentMethods={checkout.paymentMethods}
                              selectedPaymentMethodId={checkout.selectedPaymentMethodId}
                              onPaymentChange={handlePaymentChange}
                        />
                  </section>

                  {/* Summary */}
                  <CheckoutSummary
                        total={checkout.finalTotalPrice}
                        onCreateOrder={handleCreateOrder}
                        isProcessing={processingOrder}
                        isDisabled={!checkout.selectedPaymentMethodId}
                  />
            </main>
      );
}

export default function CheckoutPaymentPage() {
      return (
            <Suspense fallback={
                  <main className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                  </main>
            }>
                  <CheckoutContent />
            </Suspense>
      );
}