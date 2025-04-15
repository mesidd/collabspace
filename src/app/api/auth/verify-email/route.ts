import connectToDB from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse, NextRequest } from "next/server";
import { useDeferredValue } from "react";

export async function GET(request: NextRequest): Promise<Response> {
  const token = request.nextUrl.searchParams.get("token");

  if(!token) {
    return NextResponse.json({
      message: "Invalid token"
    }, {
      status: 400
    });
  }

  await connectToDB();

  const user = await User.findOne({
    verifyToken: token,
    verifyTokenExpiry: { $gt: Date.now() },
  });

  if(!user) {
    return NextResponse.json({
      message: "Invalid or expired token"
    }, {
      status: 400
    })
  }

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;

  await user.save();

  return NextResponse.json({
    message: "Email verified successfully!"
  },
  {
    status : 200
  });
}