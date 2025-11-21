export interface Product {
  id: number;
  name: string;
  category: string;
  price: number | string;
  imageUrl: string;
  quantity: number;
  isSelected?: boolean;
  cartItemId?: string; // ID for API operations
}

export interface CartItem {
  id: number;
  storeName: string;
  products: Product[];
}
