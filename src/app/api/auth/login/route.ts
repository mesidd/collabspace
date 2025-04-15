import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDB from "@/app/lib/mongodb";
import User from "@/app/models/User";

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

    return NextResponse.json(
      {message: "Login Successful"}, {
        status: 200
      }
    )

  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return NextResponse.json({message: "Internal Server Error"}, {
      status: 500
    })
  }
}