export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  quantity: number;
  isSelected?: boolean;
}

export interface CartItem {
  id: number;
  storeName: string;
  products: Product[];
}
