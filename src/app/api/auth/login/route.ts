// // import { NextResponse } from "next/server";

// // /**
// //  * This route proxies login requests to your backend (e.g. http://192.168.0.207:8085/api/v2/login)
// //  * and stores the JWT token in a secure HttpOnly cookie.
// //  */
// // export async function POST(req: Request) {
// //   try {
// //     // Parse request body from frontend
// //     const body = await req.json();

// //     // Forward to your actual backend login API

// //     const backendResponse = await fetch(
// //       `${process.env.NEXT_PUBLIC_API_URL}/v2/login`,
// //       {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(body),
// //       }
// //     );

// //     // Parse backend response
// //     const data = await backendResponse.json();
// //     const authToken = backendResponse.headers.get("Authorization");

// //     console.log("Auth Token:", authToken);
// //     // if (authToken) await saveCred('jwt', 'jwt', authToken);
// //     // If login failed at backend
// //     if (!backendResponse.ok || !authToken) {
// //       return NextResponse.json(
// //         {
// //           success: false,
// //           message: "Invalid credentials or missing token",
// //           details: data,
// //         },
// //         { status: backendResponse.status || 401 }
// //       );
// //     }

// //     // ✅ Create response and set JWT in secure cookie
// //     const res = NextResponse.json({
// //       success: true,
// //       message: "Login successful",
// //       user: data.user || null,
// //     });

// //     res.cookies.set("token", authToken, {
// //       httpOnly: true, // cannot be accessed via JS
// //       secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
// //       sameSite: "lax",
// //       path: "/",
// //       maxAge: 60 * 60 * 24, // 1 day
// //     });

// //     return res;
// //   } catch (error: any) {
// //     console.error("Login API error:", error);
// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: "Internal server error",
// //         error: error.message,
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextResponse } from "next/server";
// import { postRequest } from "@/lib/commonService";

// export async function POST(req: Request) {
//   try {

//     const body = await req.json();
//     console.log("Login request body:", body);

//     const backendResponse = await postRequest(`/v2/login`, body, {
//       headers: { "Content-Type": "application/json" },
//     });

//     const authToken =
//       backendResponse.headers["authorization"] ||
//       backendResponse.data?.token; 

//     if (!authToken) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Missing Authorization token in response",
//         },
//         { status: 401 }
//       );
//     }


//     const res = NextResponse.json({
//       success: true,
//       message: "Login successful",
//       user: backendResponse.data?.user || null,
//     });

//     res.cookies.set("token", authToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60 * 24, // 1 day
//     });

//     return res;
//   } catch (error: any) {
//     console.error("Login API error:", error?.response?.data || error.message);

//     return NextResponse.json(
//       {
//         success: false,
//         message:
//           error?.response?.data?.message || "Internal Server Error during login",
//         details: error?.response?.data || null,
//       },
//       { status: error?.response?.status || 500 }
//     );
//   }
// }
