import { cookies, headers, type UnsafeUnwrappedCookies } from 'next/headers'
import cookie from 'cookie'
import { NextRequest } from 'next/server'

export function getAuthCookieNextHeaders(): Headers {
  const rawCookies = cookies() as unknown as UnsafeUnwrappedCookies
  const result: Headers = new Headers()

  // Set cookies
  const encodedCookies = rawCookies
    .getAll()
    .map((k) => cookie.serialize(k.name, k.value))
    .join(';')
  result.set('Cookie', encodedCookies)

  return result
}

export function getNextHeaderFromRequestOnlyCookie(request: NextRequest) {
  const rawCookie = request.headers.get('cookie')
  const result: Headers = new Headers()
  if (rawCookie) {
    result.set('Cookie', rawCookie)
  }

  return result
}
