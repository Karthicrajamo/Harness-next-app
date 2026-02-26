import { NextRequest, NextResponse } from "next/server";
import { postRequest } from "@/lib/commonService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { success: false, message: "Query is required" },
        { status: 400 },
      );
    }

    console.log("Execute Select Value Request:", query);


    const backendResponse = await postRequest(
      `/common/execute-select-value`,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return NextResponse.json({
      success: true,
      message: "Query executed successfully",
      data: backendResponse.data || null,
    });
  } catch (error: any) {
    console.error(
      "Execute Select Value API Error:",
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.response?.data?.message ||
          "Internal Server Error while executing query",
        details: error?.response?.data || null,
      },
      { status: error?.response?.status || 500 },
    );
  }
}
