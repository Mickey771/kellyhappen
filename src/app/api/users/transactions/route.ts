// app/api/users/transactions/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to fetch transactions",
        },
        { status: response.status }
      );
    }

    // Extract deposits and withdrawals from profile data
    const transactions = {
      deposits: data.deposits || [],
      withdrawals: data.withdrawals || [],
    };

    return NextResponse.json({
      success: true,
      transactions,
    });
  } catch (error) {
    console.error("Transactions fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
