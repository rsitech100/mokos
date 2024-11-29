import { getDataAddress } from "./source/api-source";

export async function fetchProvinsi() {
      const data = await getDataAddress({ source: "provinsi" });
      console.log("Data Provinsi:", data); // Debug isi data dari API

      // Pastikan data.result adalah array sebelum menggunakan map
      if (data && typeof data === "object" && Array.isArray(data.result)) {
            return data.result.map((item: any) => ({
                  value: item.id,
                  label: item.text,
            }));
      }

      // Jika data.result bukan array, log error dan kembalikan array kosong
      console.error("Data Provinsi tidak valid:", data);
      return [];
}
