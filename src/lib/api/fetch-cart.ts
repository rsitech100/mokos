import apiService from "@/app/api/api";

export interface CartProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface CartStore {
  id: string;
  storeName: string;
  products: CartProduct[];
}

export interface CartResponse {
  message: string;
  success: boolean;
  data: CartStore[];
  result: null;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface AddToCartResponse {
  message: string;
  success: boolean;
  data: unknown;
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
export async function updateCartQuantity(cartId: string, quantity: number): Promise<AddToCartResponse> {
  try {
    const response = await apiService.put<AddToCartResponse>(`/v1/cart/${cartId}`, { quantity });
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
