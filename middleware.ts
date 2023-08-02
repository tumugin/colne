import type { NextRequest } from 'next/server'
import { getCurrentUser } from 'api-client/user'
import { redirectToLoginPage } from 'utils/no-login-redirect'
import { NextResponse } from 'next/server'
import { getNextHeaderFromRequestOnlyCookie } from 'libs/next/nextHeadersHack'

export async function middleware(request: NextRequest) {
  console.log(request.headers)
  const currentUser = await getCurrentUser(
    getNextHeaderFromRequestOnlyCookie(request),
  )

  if (!currentUser) {
    return redirectToLoginPage(request)
  }

  return NextResponse.next()
}

export const config = {
  // NOTE: Set dynamic to force-dynamic for these pages
  // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
  matcher: '/(chekis|groups|idols)(\\/.*|$)',
}
