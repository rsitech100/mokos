export async function fetchKabupatenKota(provinsiId: string) {
      try {
            const response = await fetch(`/api/v1/wilayah/kabupaten/${provinsiId}`);
            
            if (!response.ok) {
                  throw new Error("Failed to fetch kabupaten/kota");
            }

            const result = await response.json();
            const data = result.data || result;

            if (Array.isArray(data)) {
                  return data.map((item: { code: string; name: string }) => ({
                        value: item.code,
                        label: item.name,
                  }));
            }

            console.error("Data Kabupaten/Kota tidak valid:", result);
            return [];
      } catch (error) {
            console.error("Error fetching kabupaten/kota:", error);
            return [];
      }
}

