import { NextRequest, NextResponse } from 'next/server'

export function redirectToLoginPage(request: NextRequest): NextResponse {
  const queryParams = new URLSearchParams({
    return_to: request.nextUrl.pathname ?? '',
  })

  return NextResponse.redirect(
    new URL('/login?' + queryParams.toString(), request.url),
  )
}
