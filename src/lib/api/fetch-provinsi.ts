export async function fetchProvinsi() {
      try {
            const response = await fetch("/api/v1/wilayah/provinsi");
            
            if (!response.ok) {
                  throw new Error("Failed to fetch provinsi");
            }

            const result = await response.json();
            const data = result.data || result;

            if (Array.isArray(data)) {
                  return data.map((item: { code: string; name: string }) => ({
                        value: item.code,
                        label: item.name,
                  }));
            }

            console.error("Data Provinsi tidak valid:", result);
            return [];
      } catch (error) {
            console.error("Error fetching provinsi:", error);
            return [];
      }
}
