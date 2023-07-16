import { cookies, headers } from 'next/headers'
import cookie from 'cookie'

/**
 * WORKAROUND: next/headers() returns a Headers object that cannot stringify that cannot be passed in to GraphQL client.
 * Also, cookie header is not included so add it forcibly.
 */
export function getHackedNextHeaders(): Headers {
  const rawHeaders = headers()
  const rawCookies = cookies()
  const result: Headers = new Headers()

  // Set headers
  for (const key in rawHeaders.keys()) {
    const value = rawHeaders.get(key)
    if (value != null) {
      result.set(key, value)
    }
  }

  // Set cookies
  const encodedCookies = rawCookies
    .getAll()
    .map((k) => cookie.serialize(k.name, k.value))
    .join(';')
  result.set('Cookie', encodedCookies)

  return result
}
