// app/api/privileges/route.ts
import { NextResponse } from "next/server";
import { postRequest } from "@/lib/commonService";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

      const cookieStore = await cookies(); // ✅ add await
    const token = cookieStore.get("token")?.value;


    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - No token found" },
        { status: 401 }
      );
    }

    // Make backend call with Bearer token
    const backendResponse = await postRequest(`/v2/privileges`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Correct format
      },
    });

    return NextResponse.json({
      success: true,
      message: backendResponse?.data?.message || "Privileges fetched successfully",
      data: backendResponse?.data || null,
    });
  } catch (error: any) {
    console.error("Privileges error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error?.response?.data?.message ||
          "Internal Server Error while fetching privileges",
      },
      { status: error?.response?.status || 500 }
    );
  }
}