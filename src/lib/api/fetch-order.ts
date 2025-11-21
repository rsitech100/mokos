import apiService from "@/app/api/api";

export interface OrderProduct {
  id: string;
  productTitle: string;
  productImage: string;
  quantity: number;
  price: number;
  finalPrice: number;
}

export interface OrderMerchant {
  merchantId: string;
  merchantName: string;
  products: OrderProduct[];
  subtotal: number;
  shippingCost: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  progressStatus: string;
  paymentStatus: string;
  shippingAddress: {
    recipientName: string;
    recipientPhone: string;
    addressLine: string;
    kecamatan: string;
    kabupaten: string;
    provinsi: string;
    postalCode: string;
  };
  paymentMethod: {
    id: string;
    name: string;
    type: string;
  };
  merchants: OrderMerchant[];
  totalProduct: number;
  totalShipping: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderResponse {
  message: string;
  success: boolean;
  data: Order;
  result: null;
}

export interface OrderListResponse {
  message: string;
  success: boolean;
  data: Order[];
  result: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface OrderDetailResponse {
  message: string;
  success: boolean;
  data: Order;
  result: null;
}

export interface GetOrdersParams {
  progressStatus?: string;
  page?: number;
  size?: number;
}

// Create order from checkout
export async function createOrder(checkoutGroupId: string): Promise<CreateOrderResponse> {
  try {
    const response = await apiService.post<CreateOrderResponse>(
      `/v1/order/customer/${checkoutGroupId}`,
      {}
    );
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Get customer orders
export async function getOrders(params?: GetOrdersParams): Promise<OrderListResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.progressStatus) queryParams.append('progressStatus', params.progressStatus);
    if (params?.page !== undefined) queryParams.append('page', params.page.toString());
    if (params?.size !== undefined) queryParams.append('size', params.size.toString());

    const url = `/v1/order/customer${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiService.get<OrderListResponse>(url);
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

// Get order detail
export async function getOrderDetail(orderId: string): Promise<OrderDetailResponse> {
  try {
    const response = await apiService.get<OrderDetailResponse>(`/v1/order/customer/detail/${orderId}`);
    return response;
  } catch (error) {
    console.error('Error fetching order detail:', error);
    throw error;
  }
}

// Cancel order
export async function cancelOrder(orderId: string): Promise<OrderDetailResponse> {
  try {
    const response = await apiService.put<OrderDetailResponse>(
      `/v1/order/customer/${orderId}/cancel`,
      {}
    );
    return response;
  } catch (error) {
    console.error('Error canceling order:', error);
    throw error;
  }
}
