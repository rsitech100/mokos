import apiService from "@/app/api/api";

export interface CheckoutRequest {
  cartsId: string[];
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string | null;
  cost: number;
  estimatedDays: string;
  providerId?: string;
  providerCaption?: string;
  serviceName?: string;
}

export interface ShippingService {
  name: string;
  price: number;
  description: string | null;
  etd: string;
}

export interface ShippingProvider {
  provider: {
    providerId: string;
    caption: string;
  };
  services: ShippingService[];
}

export interface ShippingOptionsApiResponse {
  message: string;
  success: boolean;
  data: ShippingProvider[];
  result: null;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  description: string;
}

export interface CheckoutProduct {
  id: string;
  productPriceId: string;
  productPrice: {
    price: number;
  }
  qty: number;
  productTitle: string;
  productImage: string;
  quantity: number;
  price: number;
  finalPrice: number;
}

export interface CheckoutMerchant {
  checkoutId: string;
  merchantId: string;
  merchantName: string;
  products: CheckoutProduct[];
  subtotal: number;
  shippingOptions: ShippingOption[];
  selectedShippingId?: string;
  shippingCost: number;
}

export interface CheckoutGroup {
  checkoutGroupId: string;
  toAddress: {
    id: string;
    type: string;
    isPrimary: boolean;
    label: string;
    receiveName: string;
    phone: string;
    provinceCode: string;
    provinceName: string;
    cityCode: string;
    cityName: string;
    districtCode: string;
    districtName: string;
    villageCode: string | null;
    villageName: string | null;
    postalCode: string;
    street: string;
    lat: number;
    lon: number;
  };
  productsCheckout: Array<{
    merchantId: string;
    merchantName: string;
    checkoutId: string;
    products: CheckoutProduct[];
    shippings: ShippingOption[];
    selectedShippingId?: string;
  }>;
  paymentMethods?: PaymentMethod[];
  selectedPaymentMethodId?: string;
  totalProduct?: number;
  totalShipping?: number;
  finalTotalPrice: number;
}

export interface CheckoutResponse {
  message: string;
  success: boolean;
  data: CheckoutGroup;
  result: null;
}

export interface UpdateShippingRequest {
  checkoutId: string;
  providerId: string;
  serviceName: string;
}

export interface UpdatePaymentRequest {
  checkoutGroupId: string;
  paymentMethodId: string;
}

export interface UpdateAddressRequest {
  checkoutGroupId: string;
  toAddressId: string;
}

export interface ShippingOptionsResponse {
  message: string;
  success: boolean;
  data: ShippingProvider[];
  result: null;
}

// Create checkout
export async function createCheckout(request: CheckoutRequest): Promise<CheckoutResponse> {
  try {
    const response = await apiService.post<CheckoutResponse>('/v1/checkout', request);
    return response;
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
}

// Get shipping options for a checkout
export async function getShippingOptions(checkoutId: string): Promise<ShippingOptionsResponse> {
  try {
    const response = await apiService.get<ShippingOptionsResponse>(`/v1/checkout/shipping/${checkoutId}`);
    return response;
  } catch (error) {
    console.error('Error fetching shipping options:', error);
    throw error;
  }
}

// Update shipping method for a merchant
export async function updateShipping(request: UpdateShippingRequest): Promise<CheckoutResponse> {
  try {
    const response = await apiService.put<CheckoutResponse>(
      '/v1/checkout/shipping', 
      {
        checkoutId: request.checkoutId,
        providerId: request.providerId,
        serviceName: request.serviceName
      }
    );
    return response;
  } catch (error) {
    console.error('Error updating shipping:', error);
    throw error;
  }
}

// Update payment method
export async function updatePayment(request: UpdatePaymentRequest): Promise<CheckoutResponse> {
  try {
    const response = await apiService.put<CheckoutResponse>(
      '/v1/checkout/payment-method',
      { 
        checkoutGroupId: request.checkoutGroupId,
        paymentMethodId: request.paymentMethodId 
      }
    );
    return response;
  } catch (error) {
    console.error('Error updating payment:', error);
    throw error;
  }
}

// Update address
export async function updateAddress(request: UpdateAddressRequest): Promise<CheckoutResponse> {
  try {
    const response = await apiService.put<CheckoutResponse>(
      '/v1/checkout/address',
      { 
        checkoutGroupId: request.checkoutGroupId,
        toAddressId: request.toAddressId 
      }
    );
    return response;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
}

// Get checkout details
export async function getCheckout(checkoutGroupId: string): Promise<CheckoutResponse> {
  try {
    const response = await apiService.get<CheckoutResponse>(`/v1/checkout/group/${checkoutGroupId}`);
    return response;
  } catch (error) {
    console.error('Error fetching checkout:', error);
    throw error;
  }
}
