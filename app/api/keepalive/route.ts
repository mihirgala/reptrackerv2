import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma"; // adjust path as needed
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Make a lightweight query, like counting rows in a small table
    await db.user.count(); // Replace 'user' with any small table in your DB

    return NextResponse.json({ message: "Ping successful" }, { status: 200 });
  } catch (error) {
    console.error("Supabase ping failed", error);
    return NextResponse.json({ error: "Ping failed" }, { status: 500 });
  }
}
