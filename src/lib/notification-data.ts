import { NotificationType } from "@/types/notification";

export const NotificationItems: Record<string, NotificationType[]> = {
      'Semua': [
            { key: 1, title: 'Pesanan Diproses', description: 'ID Pesanan #I234567890 telah diproses. Segera proses untuk pengiriman.', time: '1 Jam Lalu' },
            { key: 2, title: 'Pesanan Diproses', description: 'ID Pesanan #I234567890 telah diproses. Segera proses untuk pengiriman.', time: '1 Jam Lalu' },
            { key: 3, title: 'Pesanan Diproses', description: 'ID Pesanan #I234567890 telah diproses. Segera proses untuk pengiriman.', time: '1 Jam Lalu' }
      ],
      'Belum dibaca': [
            { key: 1, title: 'Pesanan Diproses', description: 'ID Pesanan #I234567890 telah diproses. Segera proses untuk pengiriman.', time: '1 Jam Lalu' },
            { key: 2, title: 'Pesanan Diproses', description: 'ID Pesanan #I234567890 telah diproses. Segera proses untuk pengiriman.', time: '1 Jam Lalu' },
      ]
}