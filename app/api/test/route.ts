import { db } from "@/lib/db";
import { razorpay } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {

    return NextResponse.json({text:"Success",status:200})
}