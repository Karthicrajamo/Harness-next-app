import { NextResponse } from "next/server";
import { serverApi } from "@/lib/serverApi";
import { cookies } from "next/headers";

export async function GET() {

    const token = (await cookies()).get("token")?.value;

  try {
    const api = serverApi();
    const response = await api.post(
  "/api/common/execute-select",
  {
    query: `
      SELECT language_field_name FROM language_lable_details WHERE field_category = 'Label' AND language_id = ( SELECT language_id FROM language_master WHERE language_name = (SELECT secondary_language FROM hr_configuration))
    `
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);
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
