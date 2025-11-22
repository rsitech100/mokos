interface CheckoutSummaryProps {
      subtotal?: number;
      shippingCost?: number;
      totalItems?: number;
      onCreateOrder: () => void;
      isProcessing: boolean;
      isDisabled: boolean;
}

export function CheckoutSummary({ subtotal, shippingCost, totalItems, onCreateOrder, isProcessing, isDisabled }: CheckoutSummaryProps) {
      const formatIDR = (v: number) => new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
      }).format(v);

      const formattedSubtotal = formatIDR(subtotal || 0);
      const formattedShipping = formatIDR(shippingCost || 0);
      const totalBelanja = (subtotal || 0) + (shippingCost || 0);
      const formattedTotalBelanja = formatIDR(totalBelanja);

      return (
            <aside className="w-full md:w-80">
                  <div className="bg-white rounded-lg shadow-md p-5 sticky top-5">
                        <h3 className="font-bold text-neutral-700 mb-4">Ringkasan Belanja</h3>
                        <div className="space-y-2 text-sm">
                              <div className="flex justify-between text-neutral-700">
                                    <span>Total Harga ({totalItems} Barang)</span>
                                    <span>{formattedSubtotal}</span>
                              </div>
                              <div className="flex justify-between text-neutral-700">
                                    <span>Total Ongkos Kirim</span>
                                    <span>{formattedShipping}</span>
                              </div>
                              <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between text-base font-bold">
                                          <span>Total Belanja</span>
                                          <span className="text-primary-500">{formattedTotalBelanja}</span>
                                    </div>
                              </div>
                        </div>
                        <button
                              onClick={onCreateOrder}
                              disabled={isDisabled || isProcessing}
                              className={`w-full mt-4 py-3 rounded-lg font-semibold transition-colors ${
                                    isDisabled || isProcessing
                                          ? 'bg-neutral-400 text-neutral-100 cursor-not-allowed'
                                          : 'bg-primary-500 text-white hover:bg-primary-600'
                              }`}
                        >
                              {isProcessing ? 'Memproses...' : 'Checkout Pesanan'}
                        </button>
                  </div>
            </aside>
      );
}
