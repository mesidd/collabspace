import  { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function PUT(req: NextRequest) {

  await connectToDB();

  const { userId, currentPosition, goals, challenges, achievements} = await req.json();

  try{

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const nickname = `Dreamer4`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        currentPosition,
        goals,
        challenges,
        achievements,
        nickname,
        upadtedAt: new Date(),
      },
      {new: true}
    );

    if(!updatedUser) {
      return NextResponse.json({
        message: 'User not found'
      }, {
        status: 404
      });
    }
    return NextResponse.json({
      message:'User Details updated',
      user: updatedUser },
      {
      status: 200
    });
  } catch(error){
    console.error('Update error: ', error);
    return NextResponse.json({
      message: 'Server Error'
    },{
      status: 500
    });
  } 
}