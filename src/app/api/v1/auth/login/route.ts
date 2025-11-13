import { NextResponse } from "next/server";

export async function POST(req: Request) {
      try {
            const body = await req.json();

            const response = await fetch("http://47.245.95.207:8000/api/v1/auth/login", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(body),
            });
            
            const data = await response.json();

            if (!response.ok) {
                  return NextResponse.json(
                        { success: false, message: data.message || "Login failed" },
                        { status: response.status }
                  );
            }

            return NextResponse.json({ success: true, data });
      } catch (error: unknown) {
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