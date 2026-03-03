import { NextResponse } from "next/server";
import { postRequest } from "@/lib/commonService";

export async function POST(req: Request) {
  try {

    const body = await req.json();
    console.log("Login request body:", body);

    const backendResponse = await postRequest(`/v2/login`, body, {
      headers: { "Content-Type": "application/json" },
    });

    const authToken =
      backendResponse.headers["authorization"] ||
      backendResponse.data?.token; 

    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing Authorization token in response",
        },
        { status: 401 }
      );
    }


    const res = NextResponse.json({
      success: true,
      message: "Login successful",
      user: backendResponse.data || null,
    });

    res.cookies.set("token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return res;
  } catch (error: any) {
    console.error("Login API error:", error?.response?.data || error.message);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.response?.data?.message || "Internal Server Error during login",
        details: error?.response?.data || null,
      },
      { status: error?.response?.status || 500 }
    );
  }
}
