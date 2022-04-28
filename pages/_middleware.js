import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
const secret = process.env.SECRET

export default function middleware(req) {
  const { cookies } = req
  const jwt = cookies.OursiteJWT
  const url = req.nextUrl.clone()

  if (url.pathname.includes("/dashboard")) {
    if (!jwt) {
      return NextResponse.rewrite(new URL("/login", url))
    }

    try {
      const userPayload = verify(jwt, secret)
      console.log({ userPayload })

      return NextResponse.next()
    } catch (error) {
      return NextResponse.rewrite(new URL("/login", url))
    }
  }

  if (url.pathname.includes("/login")) {
    if (jwt) {
      try {
        verify(jwt, secret)
        return NextResponse.rewrite(new URL("/", url))
      } catch (error) {
        return NextResponse.rewrite(new URL("/signup", url))
      }
    }
  }

  return NextResponse.next()
}
