const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "";

export async function getProductDetailById(productId: string) {
      try {
            const response = await fetch(`${BASE_API}/v1/product?id=${productId}`, {
                  next: { revalidate: 300 }, // Cache for 5 minutes
            });
            if (!response.ok) return null;

            const data = await response.json();
            if (!data.success || !data.data || data.data.length === 0) return null;

            return data.data[0];
      } catch (err) {
            console.error("❌ Error product detail:", err);
            return null;
      }
}

export async function getProductImages(productId: string) {
      try {
            const response = await fetch(`${BASE_API}/v1/product-media/main/${productId}`, {
                  next: { revalidate: 300 }
            });
            if (!response.ok) return [];

            const data = await response.json();
            if (!data.success || !data.data) return [];

            return data.data.map((img: { id: string; name?: string; module?: string; uri: string }) => ({
                  id: img.id,
                  name: img.name || '',
                  module: img.module || '',
                  uri: img.uri,
                  fullUrl: img.uri.startsWith('http') ? img.uri : `${BASE_API}${img.uri}`
            }));
      } catch (err) {
            console.error("❌ Error product images:", err);
            return [];
      }
}
