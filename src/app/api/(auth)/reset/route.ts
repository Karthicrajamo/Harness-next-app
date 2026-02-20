import { NextResponse } from "next/server";
import { postRequest } from "@/lib/commonService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Reset Password Request:", body);

    const backendResponse = await postRequest(`/user/resetPassword`, body, {
      headers: { "Content-Type": "application/json" },
    });

    // Backend expected success message
    const message =
      backendResponse.data?.message || "Password changed successfully";

    return NextResponse.json({
      success: true,
      message,
      data: backendResponse.data || null,
    });
  } catch (error: any) {
    console.error(
      "Reset Password API Error:",
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.response?.data?.message ||
          "Internal Server Error while resetting password",
        details: error?.response?.data || null,
      },
      { status: error?.response?.status || 500 },
    );
  }
}
