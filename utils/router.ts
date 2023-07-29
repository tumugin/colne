import { type useRouter } from 'next/navigation'

export async function onFollowNextLink(
  router: ReturnType<typeof useRouter>,
  event: CustomEvent<{ href: string | undefined } | null>,
  path?: string,
) {
  event.preventDefault()
  await router.push(path || event.detail?.href || neverLink())
}

function neverLink(): never {
  throw new Error('No href')
}
