import { type useRouter } from 'next/navigation'

export function onFollowNextLink(
  router: ReturnType<typeof useRouter>,
  event: CustomEvent<{ href: string | undefined } | null>,
  path?: string,
) {
  event.preventDefault()
  router.push(path || event.detail?.href || neverLink())
}

function neverLink(): never {
  throw new Error('No href')
}
