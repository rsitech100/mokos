import { getDataAddress } from "./source/api-source";

export async function fetchKabupatenKota() {
      const data = await getDataAddress({ source: 'kabkota' });
      // console.log("Data Kabupaten Kota:", data); // Debug isi data dari API

      // Pastikan data.result adalah array sebelum menggunakan map
      if (data && typeof data === "object" && Array.isArray(data.result)) {
            return data.result.map((item: any) => ({
                  value: item.id,
                  label: item.text,
            }));
      }

      // Jika data.result bukan array, log error dan kembalikan array kosong
      // console.error("Data Kabupaten/Kota tidak valid:", data);
      return [];
}

