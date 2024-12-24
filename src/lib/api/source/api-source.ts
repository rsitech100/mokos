'use client';

interface ApiSourceProps {
      source: string;
}

export async function getDataAddress({ source }: ApiSourceProps) {
      try {
            const response = await fetch(`https://alamat.thecloudalert.com/api/${source}/get/`);

            if (!response.ok) {
                  throw new Error(`Failed to fetch data from ${source}`);
            }

            const data = await response.json();
            return data;

      } catch (error) {
            console.error(`Error fetching data from ${source}:`, error);
            return null; // Return null or handle the error as needed
      }
}