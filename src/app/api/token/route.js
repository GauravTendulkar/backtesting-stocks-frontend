import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { auth } from '@/auth'

const JWT_SECRET = process.env.BACKEND_JWT_SECRET
const JWT_ALGORITHM = process.env.JWT_ALGORITHM
const EXPIRY = '5m'



export async function GET() {
  try {
    const session = await auth()

    // if (!session?.user?.email) {
    //   return NextResponse.json({ error: 'No session found' }, { status: 401 })
    // }
    // console.log(session, "************************************* await auth()")

    const payload = {
      email: session?.user?.email || null
      // email: null
    }

    // const token = jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRY })
    const token = jwt.sign(payload, JWT_SECRET, {
      algorithm: JWT_ALGORITHM,
      expiresIn: EXPIRY,
    })
    // console.log("token jwt ******************", token)
    return NextResponse.json({ token })
  } catch (err) {
    return NextResponse.json(
      { error: 'Token creation failed', detail: err.message },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required for token generation" },
        { status: 400 }
      );
    }

    const payload = { email };

    const token = jwt.sign(payload, JWT_SECRET, {
      algorithm: JWT_ALGORITHM,
      expiresIn: EXPIRY,
    });

    return NextResponse.json({ token });
  } catch (err) {
    return NextResponse.json(
      { error: "Token creation failed", detail: err.message },
      { status: 500 }
    );
  }
}