import { NextResponse } from "next/server";
import { serverApi } from "@/lib/serverApi";

export async function GET() {
  try {
    const api = serverApi();
    const response = await api.get("/api/dashboard/getNotes?user_id=");
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("Home API error:", error);
    const errorRecord = error as Record<string, unknown>;
    return NextResponse.json(
      {
        success: false,
        message: (errorRecord?.message as string) || "Server error",
      },
      {
        status:
          ((errorRecord?.response as Record<string, unknown>)
            ?.status as number) || 500,
      }
    );
  }
}
