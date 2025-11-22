import apiService from "@/app/api/api";

export interface ProductPrice {
  id: string;
  isMainView: boolean;
  price: number;
  stock: number;
  primaryVariant: string | null;
  secondaryVariant: string | null;
  product: {
    id: string;
    title: string;
    description: string;
    totalRating: number;
    category: {
      id: string;
      name: string;
      description: string;
      isChild: boolean;
    };
    merchant: {
      id: string;
      name: string;
      description: string;
      url: string;
      phone: string;
      pictureFile: string | null;
    };
    weight: number;
    unitWeight: string;
    lengthDimension: number;
    widthDimension: number;
    heightDimension: number;
    unitDimension: string;
    isNew: boolean;
    useVariant: boolean;
    primaryVariantName: string | null;
    useSecondaryVariant: boolean;
    secondaryVariantName: string | null;
    publishStatus: string;
    soldStock: number;
    viewsCount: number;
    price: number;
  };
}

export interface OrdersProduct {
  id: string;
  createdDate: number;
  productPrice: ProductPrice;
  qty: number;
  description: string | null;
  finalTotalPrice: number;
}

export interface Address {
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
}

export interface Merchant {
  id: string;
  name: string;
  description: string;
  url: string;
  phone: string;
  pictureFile: string | null;
}

export interface Order {
  id: string;
  createdDate: number;
  orderNumber: string;
  merchant: Merchant;
  fromAddress: Address;
  toAddress: Address;
  totalWeight: number;
  shippingMap: Record<string, unknown> | null;
  paymentMethod: Record<string, unknown> | null;
  finalTotalPrice: number;
  processStatus: string;
  ordersProduct: OrdersProduct[];
  shippingTotalPrice: number;
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
    total: number;
    sort: string | null;
    order: string | null;
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
    const response = await apiService.get<OrderDetailResponse>(`/v1/order/customer/${orderId}`);
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
