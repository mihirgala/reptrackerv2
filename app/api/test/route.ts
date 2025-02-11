import { NextRequest, NextResponse } from "next/server";

export const GET = (request:NextRequest) =>{
    console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
    console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);
    return NextResponse.json({message: "Hello World"});
}