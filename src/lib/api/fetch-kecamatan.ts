export async function fetchKecamatan(kabupatenId: string) {
      try {
            const response = await fetch(`/api/v1/wilayah/kecamatan/${kabupatenId}`);
            
            if (!response.ok) {
                  throw new Error("Failed to fetch kecamatan");
            }

            const result = await response.json();
            const data = result.data || result;

            if (Array.isArray(data)) {
                  return data.map((item: { code: string; name: string }) => ({
                        value: item.code,
                        label: item.name,
                  }));
            }

            console.error("Data Kecamatan tidak valid:", result);
            return [];
      } catch (error) {
            console.error("Error fetching kecamatan:", error);
            return [];
      }
}
