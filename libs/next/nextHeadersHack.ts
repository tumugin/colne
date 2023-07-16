import { headers } from 'next/headers'

/**
 * WORKAROUND: next/headers() returns a Headers object that cannot stringify that cannot be passed in to GraphQL client.
 */
export function getSafeNextHeaders(): Headers {
  const rawHeaders = headers()
  const result: Headers = new Headers()

  for (const key in rawHeaders.keys()) {
    const value = rawHeaders.get(key)
    if (value != null) {
      result.set(key, value)
    }
  }

  return result
}
