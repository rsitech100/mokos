import { ApiLocalType } from "@/types/api-local";
import { getDataAddress } from "./source/api-source";

export async function fetchKodePos() {
      const data = await getDataAddress({ source: "kodepos" });
      // console.log("Data Kode Pos:", data); // Debug isi data dari API

      // Pastikan data.result adalah array sebelum menggunakan map
      if (data && typeof data === "object" && Array.isArray(data.result)) {
            return data.result.map((item: ApiLocalType) => ({
                  value: item.id,
                  label: item.text,
            }));
      }

      // Jika data.result bukan array, log error dan kembalikan array kosong
      // console.error("Data Kode Pos tidak valid:", data);
      return [];
}
