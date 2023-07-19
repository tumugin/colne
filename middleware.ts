import type { NextRequest } from 'next/server'
import { getCurrentUser } from 'api-client/user'
import { redirectToLoginPage } from 'utils/no-login-redirect'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const currentUser = await getCurrentUser(request.headers)

  if (!currentUser) {
    return redirectToLoginPage(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/(chekis|groups|idols)/(.*)',
}
