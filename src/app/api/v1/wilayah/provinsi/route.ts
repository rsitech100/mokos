import { NextResponse } from "next/server";

export async function GET() {
      try {
            const response = await fetch("https://wilayah.id/api/provinces.json");
            
            if (!response.ok) {
                  return NextResponse.json(
                        { error: "Failed to fetch provinsi" },
                        { status: response.status }
                  );
            }

            const data = await response.json();
            return NextResponse.json(data);
      } catch (error) {
            console.error("Error fetching provinsi:", error);
            return NextResponse.json(
                  { error: "Internal server error" },
                  { status: 500 }
            );
      }
}
