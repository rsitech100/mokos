import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
      try {
            const kabupatenId = context.params.kabupatenId;

            const response = await fetch(
                  `https://wilayah.id/api/districts/${kabupatenId}.json`
            );

            if (!response.ok) {
                  return NextResponse.json(
                        { error: "Failed to fetch kecamatan" },
                        { status: response.status }
                  );
            }

            const data = await response.json();
            return NextResponse.json(data);
      } catch (error) {
            console.error("Error fetching kecamatan:", error);
            return NextResponse.json(
                  { error: "Internal server error" },
                  { status: 500 }
            );
      }
}
