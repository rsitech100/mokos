import apiService from "@/app/api/api";

export interface CartProductItem {
  id: string;
  productPrice: {
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
        pictureFile: unknown;
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
      pictureFiles?: Array<{
        id: string;
        name: string;
        module: string;
        uri: string;
      }>;
    };
  };
  qty: number;
  finalTotalPrice: number;
}

export interface CartMerchant {
  merchant: {
    id: string;
    name: string;
    description: string;
    url: string;
    phone: string;
    pictureFile: unknown;
  };
  productsCart: CartProductItem[];
  finalPriceTotal: number;
}

export interface CartResponse {
  message: string;
  success: boolean;
  data: CartMerchant[];
  result: null;
}

export interface AddToCartRequest {
  id?: string;
  productPriceId: string;
  qty: number;
}

export interface UpdateCartRequest {
  id: string;
  qty: number;
}

export interface AddToCartResponse {
  message: string;
  success: boolean;
  data: CartProductItem;
  result: null;
}

// Fetch cart items
export async function fetchCart(): Promise<CartResponse> {
  try {
    const response = await apiService.get<CartResponse>('/v1/cart');
    return response;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
}

// Add product to cart
export async function addToCart(data: AddToCartRequest): Promise<AddToCartResponse> {
  try {
    const response = await apiService.post<AddToCartResponse>('/v1/cart', data);
    return response;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

// Update cart item quantity
export async function updateCart(data: UpdateCartRequest): Promise<AddToCartResponse> {
  try {
    const response = await apiService.put<AddToCartResponse>('/v1/cart', data);
    return response;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
}

// Remove item from cart
export async function removeFromCart(cartId: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await apiService.delete<{ success: boolean; message: string }>(`/v1/cart/${cartId}`);
    return response;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}
