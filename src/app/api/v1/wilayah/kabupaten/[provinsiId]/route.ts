import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  try {
    const provinsiId = context.params.provinsiId;

    const response = await fetch(
      `https://wilayah.id/api/regencies/${provinsiId}.json`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch kabupaten/kota" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching kabupaten/kota:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
