import { ApiLocalType } from "@/types/api-local";
// import { getDataAddress } from "./source/api-source";

export async function fetchKecamatan(kabupatenId: string) {
      const response = await fetch(`https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${kabupatenId}`);
      const data = await response.json();
      // console.log("Data Kecamatan:", data); // Debug isi data dari API

      // Pastikan data.result adalah array sebelum menggunakan map
      if (data && typeof data === "object" && Array.isArray(data.result)) {
            return data.result.map((item: ApiLocalType) => ({
                  value: item.id,
                  label: item.text,
            }));
      }

      // Jika data.result bukan array, log error dan kembalikan array kosong
      console.error("Data Kecamatan tidak valid:", data);
      return [];
}
