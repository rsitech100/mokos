interface PaymentMethod {
      id: string;
      name: string;
      type: string;
}

interface PaymentMethodSelectorProps {
      paymentMethods?: PaymentMethod[];
      selectedPaymentMethodId?: string;
      onPaymentChange: (paymentMethodId: string) => void;
}

export function PaymentMethodSelector({ paymentMethods, selectedPaymentMethodId, onPaymentChange }: PaymentMethodSelectorProps) {
      if (!paymentMethods || paymentMethods.length === 0) {
            return null;
      }

      return (
            <div className="bg-white rounded-lg shadow-md p-5">
                  <h3 className="font-bold text-neutral-700 mb-3">Metode Pembayaran</h3>
                  <select
                        className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
                        value={selectedPaymentMethodId || ''}
                        onChange={(e) => onPaymentChange(e.target.value)}
                  >
                        <option value="">Pilih metode pembayaran</option>
                        {paymentMethods.map((payment) => (
                              <option key={payment.id} value={payment.id}>
                                    {payment.name} - {payment.type}
                              </option>
                        ))}
                  </select>
            </div>
      );
}
