import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/lib/mongodb";
import User from '@/app/models/User';
import bcrypt from "bcryptjs";

import { signJWT } from "@/app/lib/jwt";
import nodemailer from 'nodemailer';
import { serialize } from 'cookie';
import crypto from 'crypto'; 


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


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

    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyTokenExpiry = Date.now() + 600000;


    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      verifyToken,
      verifyTokenExpiry,
    });

    await newUser.save();

    const verificationUrl = `${process.env.BASE_URL}/api/auth/verify-email?token=${verifyToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      html: `
      <p> Please Click the link below to verify your email: </p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    // return NextResponse.json({
    //   message: 'User registered successfully!'}, { status: 201 });

    return NextResponse.json({
      message: "Signup successful! Please check your email for verification."
    },
  {
    status: 200
  });

  } catch(error) {
    console.error('[SIGNUP_ERROR', error);
    return NextResponse.json({ message: "Internal Server Error "}, { status: 500})
  }
}