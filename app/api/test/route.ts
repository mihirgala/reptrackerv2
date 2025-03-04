import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {

    return NextResponse.json({text:"Success",status:200})
}