import jwt from 'jsonwebtoken'

const JWT_SECRET =  process.env.JWT_SECRET || 'your_dev_secret';

export function signJWT(payload: object, options?: jwt.SignOptions ): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1d',
    ...options,
  });
}

export function verifyJWT(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);    
  } catch (error) {
    return null;
  }
}


