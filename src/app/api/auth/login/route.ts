import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDB from "@/app/lib/mongodb";
import User from "@/app/models/User";

import { signJWT } from "@/app/lib/jwt";
import { serialize } from 'cookie';

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { email, password } = body as { 
      email: string,
      password : string
    };

    if (!email || !password) {
      return NextResponse.json({message: "All fields are required"}, {status: 400})
    }

    await connectToDB();

    const user = await User.findOne({email});

    if(!user){
      return NextResponse.json({message: "Invalid credentials"}, {status: 401})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect){
      return NextResponse.json({message: "Invalid credentials"},{status: 401})
    }

    const token = signJWT({userId: user._id});

    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });

    const response = NextResponse.json({ message: "Login successful"});
    response.headers.set("Set-Cookie", cookie);

    return response;

  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return NextResponse.json({message: "Internal Server Error"}, {
      status: 500
    })
  }
}