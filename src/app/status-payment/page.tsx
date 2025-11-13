import { FailedPayment } from "@/containers/checkout-payment/failed-payment";
import { SuccessPayment } from "@/containers/checkout-payment/success-payment";

export default function StatusPaymentPage() {
      return (
            <main className="py-10 px-5 lg:px-20 max-w-[1440px] w-full mx-auto flex items-center justify-center h-screen">
                  <SuccessPayment />
                  <FailedPayment />
            </main>
      )
}