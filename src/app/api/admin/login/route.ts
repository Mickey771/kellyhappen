import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Admin login failed" },
        { status: response.status }
      );
    }

    const token = data.access_token;

    if (token) {
      const response = NextResponse.json({
        success: true,
        admin: data.admin,
        token: token,
      });

      response.cookies.set({
        name: "admin_auth_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
        sameSite: "strict",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid authentication response" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
