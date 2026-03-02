// app/api/login/route.ts
import { NextResponse } from "next/server";
import { postRequest } from "@/lib/commonService";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendResponse = await postRequest(`/v2/login`, body, {
      headers: { "Content-Type": "application/json" },
    });

    // Extract token
    const authToken =
      backendResponse?.data?.token ||
      backendResponse?.headers?.authorization;

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: "Token not received from backend" },
        { status: 401 }
      );
    }

    // Remove "Bearer " if present
    const cleanToken = authToken.startsWith("Bearer ")
      ? authToken.replace("Bearer ", "")
      : authToken;

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: backendResponse?.data || null,
    });

    // Set HTTP-only cookie
    response.cookies.set("token", cleanToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error?.response?.data?.message || "Internal Server Error during login",
      },
      { status: error?.response?.status || 500 }
    );
  }
}