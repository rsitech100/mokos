interface CheckoutSummaryProps {
      total: number;
      onCreateOrder: () => void;
      isProcessing: boolean;
      isDisabled: boolean;
}

export function CheckoutSummary({ total, onCreateOrder, isProcessing, isDisabled }: CheckoutSummaryProps) {
      const formattedTotal = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
      }).format(total);

      return (
            <aside className="w-full md:w-80">
                  <div className="bg-white rounded-lg shadow-md p-5 sticky top-5">
                        <h3 className="font-bold text-neutral-700 mb-4">Ringkasan Belanja</h3>
                        <div className="space-y-2 text-sm">
                              <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between text-base font-bold">
                                          <span>Total</span>
                                          <span className="text-primary-500">{formattedTotal}</span>
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
                              {isProcessing ? 'Memproses...' : 'Buat Pesanan'}
                        </button>
                  </div>
            </aside>
      );
}
