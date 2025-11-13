// import { getDataAddress } from "./source/api-source";
import { ApiLocalType } from "@/types/api-local";

export async function fetchKabupatenKota(provinsiId: string) {
      const response = await fetch(`https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${provinsiId}`);
      const data = await response.json();
      // debugging -->
      // console.log("Data Kabupaten Kota:", data); 

      // Pastikan data.result adalah array sebelum menggunakan map
      if (data && typeof data === "object" && Array.isArray(data.result)) {
            return data.result.map((item: ApiLocalType) => ({
                  value: item.id,
                  label: item.text,
            }));
      }

      // console.error("Data Kabupaten/Kota tidak valid:", data);
      return [];
}

