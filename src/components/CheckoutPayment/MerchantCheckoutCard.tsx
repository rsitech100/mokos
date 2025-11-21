import { ProductCheckoutCard } from "./ProductCheckoutCard";
import { ShippingSelector } from "./ShippingSelector";

interface MerchantCheckoutCardProps {
      merchant: {
            merchantId: string;
            merchantName?: string;
            checkoutId: string;
            products: Array<unknown>;
            shippings?: Array<{
                  id: string;
                  name: string;
                  cost: number;
                  estimatedDays: string;
            }>;
            selectedShippingId?: string;
      };
      onShippingChange: (checkoutId: string, shippingId: string, shippingName: string) => void;
}

export function MerchantCheckoutCard({ merchant, onShippingChange }: MerchantCheckoutCardProps) {
      const handleShippingChange = (shippingId: string, shippingName: string) => {
            onShippingChange(merchant.checkoutId, shippingId, shippingName);
      };

      return (
            <div className="bg-white rounded-lg shadow-md p-5">
                  <h3 className="font-bold text-neutral-700 mb-3">{merchant.merchantName || 'Toko'}</h3>

                  {/* Products */}
                  {merchant.products && merchant.products.length > 0 ? (
                        merchant.products.map((product, index) => (
                              <ProductCheckoutCard 
                                    key={index} 
                                    product={product as never} 
                              />
                        ))
                  ) : (
                        <p className="text-sm text-neutral-500 mb-3">Tidak ada produk</p>
                  )}

                  {/* Shipping Options */}
                  <ShippingSelector
                        shippings={merchant.shippings}
                        selectedShippingId={merchant.selectedShippingId}
                        onShippingChange={handleShippingChange}
                  />
            </div>
      );
}
