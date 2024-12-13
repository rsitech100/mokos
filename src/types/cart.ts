export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface CartItem {
  id: number;
  storeName: string;
  products: Product[];
}
