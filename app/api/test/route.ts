import { getSystemMessage } from "@/data";
import { getUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET =  (request:NextRequest) =>{
    return NextResponse.json({Text:"Hello World"});
}