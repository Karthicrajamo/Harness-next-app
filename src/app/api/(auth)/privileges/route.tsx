// app/api/privileges/route.ts

import { NextResponse } from "next/server";
import { postRequest } from "@/lib/commonService";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cookieStore = await cookies(); 
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - No token found" },
        { status: 401 }
      );
    }

    const backendResponse = await postRequest("/v2/privileges", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`, 
      },
    });

    return NextResponse.json({
      success: true,
      message: backendResponse?.data?.message,
      data: backendResponse?.data,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message:
          error?.response?.data?.message ||
          "Privileges fetch failed",
      },
      { status: error?.response?.status || 500 }
    );
  }
}