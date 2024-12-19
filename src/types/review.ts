export type ReviewDataType = {
  id: number;
  invoice: string; // Nomor Invoice
  name: string;
  storeName: string; // Nama Toko
  productName: string; // Nama Produk
  price: string; // Harga Produk
  quantity: number; // Jumlah Produk
  rating: number;
  date: string;
  reviewText: string;
  images: string[]; // Array of strings (URLs)
};
