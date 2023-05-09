import { type NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from 'src/lib/auth'

export const config = {
  matcher: [ '/api/embeddings' ],
}

export async function middleware(req: NextRequest) {
  const token = req.headers.get('authorization');
  // validate the user is authenticated
  const verifiedToken = await verifyAuth(token).catch((err) => {
    console.error(err.message)
  })

  if (!verifiedToken) {
    // if this an API request, respond with JSON
    if (req.nextUrl.pathname.startsWith('/api/embeddings')) {
      return new NextResponse(
        JSON.stringify({ 'error': { message: 'authentication required' } }),
        { status: 401 });
    }
    // otherwise, redirect to the set token page
    else {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
}