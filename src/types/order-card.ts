export type OrderCardType = {
      id: number; // ID unik untuk kartu pesanan
      status: string; // Status pesanan (misalnya "Sedang Dikirim")
      number_invoice: string; // Nomor invoice pesanan
      date: string; // Tanggal dan waktu pesanan
      items: {
        name: string; // Nama produk
        quantity: number; // Jumlah produk
        price: number; // Harga satuan produk
      }[]; // Array untuk menyimpan informasi produk dalam pesanan
      total_price: number; // Total harga semua produk
    };
    