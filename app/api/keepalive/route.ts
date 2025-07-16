import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expected) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // A lightweight query
    await prisma.user.count(); // Replace `user` with your actual table

    return NextResponse.json({ message: "Supabase pinged" });
  } catch (error) {
    console.error("Cron job failed", error);
    return new NextResponse("Error", { status: 500 });
  }
}
