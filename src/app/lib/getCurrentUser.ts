import { cookies } from 'next/headers';
import { verifyJWT } from './jwt';
import User from '../models/User';
import connectToDB from './mongodb';

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if(!token) return null;

  const decoded = verifyJWT(token);
  if(!decoded || !decoded.userId) return null;

  await connectToDB();
  const user = await User.findById(decoded.userId).select('-password');

  return user;

}