import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // Do some checks here to see if the user is logged in
  console.log('Running middleware')
  return NextResponse.next()
}

export const config = {
  matchers: [
    '/dashboard', // <-- Middleware will only run on this protected path
    '/((?!api|_next/static|_next/image|favicon.ico).*)', // <-- Middleware will run on these paths
  ],
}
