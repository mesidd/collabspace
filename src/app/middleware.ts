import { NextResponse } from "next/server"; 
import { getCurrentUser } from "./lib/getCurrentUser";

export async function middleware(requ: Request) {
  const user = await getCurrentUser();

  if(!user) {
    return NextResponse.json({message: 'Unauthorized'}, {
      status: 401
    })
  }
  return NextResponse.next();
}

export const config = {
  matcher : ['/api/protected/*', '/dashboard'],
};