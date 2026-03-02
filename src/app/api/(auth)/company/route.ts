import { NextResponse } from "next/server";
import { postRequest } from "@/lib/commonService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Get company details request:", body);

    const backendResponse = await postRequest(
      `/v2/comp-div-details`,
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return NextResponse.json({
      success: true,
      message:
        backendResponse?.data?.message ||
        "Company data fetched successfully",
      data: backendResponse?.data || null,
    });
  } catch (error: any) {
    console.error(
      "Company Details API Error:",
      error?.response?.data || error.message
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.response?.data?.message ||
          "Internal Server Error while fetching company details",
        details: error?.response?.data || null,
      },
      { status: error?.response?.status || 500 }
    );
  }
}