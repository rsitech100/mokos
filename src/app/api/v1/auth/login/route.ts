import { NextResponse } from "next/server";
import { ApiService } from "@/app/api/api"

var apiService = new ApiService()

export async function POST(req: Request) {
      try {
            const body = await req.json();
            const response = await apiService.get<any>('/v1/auth/login', body);
            const data = response;

            return NextResponse.json({ success: true, data });
      } catch (error: unknown) {
            console.log(error, "error")
            if (error instanceof Error) {
                  return NextResponse.json(
                        { success: false, message: error.message || "Something went wrong" },
                        { status: 500 }
                  );
            }
            return NextResponse.json(
                  { success: false, message: "An unknown error occurred" },
                  { status: 500 }
            );
      }
}      