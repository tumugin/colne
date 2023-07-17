import { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

export function redirectToLoginPage(request: NextRequest) {
  const queryParams = new URLSearchParams({
    return_to: request.nextUrl.pathname ?? '',
  })
  redirect('/login?' + queryParams.toString())
}
