import { NextResponse } from "next/server";
import { query } from "@/lib/db_hulu_guzo_user"; // your Neon DB helper

export async function GET() {
  try {
    // Call the cleanup function in DB
    await query(`SELECT cleanup_unconfirmed_expired_payments()`);

    return NextResponse.json({
      success: true,
      message: "Cleanup executed successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
