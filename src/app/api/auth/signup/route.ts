import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/lib/mongodb";
import User from '@/app/models/User';
import bcrypt from "bcryptjs";

export async function POST(request: Request) : Promise<Response> {
  try{
    const body = await request.json();
    const { username, email, password } = body as {
      username: string,
      email: string,
      password: string
    };

    if (!username || !email || !password) {
      return new Response(JSON.stringify(
        {message: 'All fields are required'}), 
        { status: 400 });
      }

    await connectToDB();

    const existingUser = await User.findOne({$or: [{email}, {username}]});
    if (existingUser) {
      return NextResponse.json({message: 'User already exists'}, {status: 409});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    return NextResponse.json({
      message: 'User registered successfully!'}, { status: 201 });

  } catch(error) {
    console.error('[SIGNUP_ERROR', error);
    return NextResponse.json({ message: "Internal Server Error "}, { status: 500})
  }
}