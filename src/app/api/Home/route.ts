import { NextResponse } from "next/server";
import { serverApi } from "@/lib/serverApi";

export async function GET(req:Request) {
  try {
    const api = serverApi();
    const response = await api.get("/api/dashboard/getNotes?user_id=");
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Home API error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status: error?.response?.status || 500 }
    );
  }
}
