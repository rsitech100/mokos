'use client';
import { useState, useEffect } from "react";
import { ProductCheckoutCard } from "./ProductCheckoutCard";
import { ShippingSelector } from "./ShippingSelector";
import { getShippingOptions, ShippingOption } from "@/lib/api/fetch-checkout";

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
      onShippingChange: (checkoutId: string, shippingId: string, shippingName: string, shippingCost: number) => void;
}

export function MerchantCheckoutCard({ merchant, onShippingChange }: MerchantCheckoutCardProps) {
      const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
      const [loadingShipping, setLoadingShipping] = useState(true);

      useEffect(() => {
            loadShippingOptions();
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [merchant.checkoutId]);

      const loadShippingOptions = async () => {
            try {
                  setLoadingShipping(true);
                  const response = await getShippingOptions(merchant.checkoutId);
                  if (response.success) {
                        // Transform API response: flatten providers + services into ShippingOption[]
                        const flattenedOptions: ShippingOption[] = [];
                        
                        response.data.forEach(provider => {
                              provider.services.forEach(service => {
                                    flattenedOptions.push({
                                          id: `${provider.provider.providerId}_${service.name}`,
                                          name: `${provider.provider.caption} - ${service.name}`,
                                          description: service.description,
                                          cost: service.price,
                                          estimatedDays: service.etd,
                                          providerId: provider.provider.providerId,
                                          providerCaption: provider.provider.caption,
                                          serviceName: service.name // ADD THIS!
                                    });
                              });
                        });
                        
                        setShippingOptions(flattenedOptions);
                  }
            } catch (error) {
                  console.error('Error loading shipping options:', error);
            } finally {
                  setLoadingShipping(false);
            }
      };

      const handleShippingChange = (shippingId: string) => {
            // console.log('===== SHIPPING CHANGE DEBUG =====');
            // console.log('Raw shippingId received:', shippingId);
            // console.log('Available shipping options:', shippingOptions);
            
            if (!shippingId || shippingId.trim() === '') {
                  console.error('ERROR: shippingId is empty or null');
                  return;
            }
            
            const selectedShipping = shippingOptions.find(s => s.id === shippingId);
            // console.log('Found selectedShipping:', selectedShipping);
            
            if (!selectedShipping) {
                  console.error('ERROR: Could not find shipping option with id:', shippingId);
                  return;
            }
            
            const shippingCost = selectedShipping.cost || 0;
            const providerId = selectedShipping.providerId || '';
            const serviceName = selectedShipping.serviceName || '';
            
            console.log('Extracted values:', {
                  providerId,
                  serviceName,
                  shippingCost,
                  fullName: selectedShipping.name
            });
            
            if (!providerId || !serviceName) {
                  console.error('ERROR: Invalid shipping data', { providerId, serviceName });
                  return;
            }
            
            console.log('Calling onShippingChange with:', {
                  checkoutId: merchant.checkoutId,
                  providerId,
                  serviceName,
                  shippingCost
            });
            
            // Pass providerId as shippingId, serviceName, and cost
            onShippingChange(merchant.checkoutId, providerId, serviceName, shippingCost);
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
                        shippings={shippingOptions}
                        selectedShippingId={merchant.selectedShippingId}
                        onShippingChange={handleShippingChange}
                        loading={loadingShipping}
                  />
            </div>
      );
}
