import { NextRouter } from 'next/router'

export async function onFollowNextLink(
  router: NextRouter,
  event: CustomEvent<{ href: string | undefined } | null>,
  path?: string
) {
  event.preventDefault()
  await router.push(path || event.detail?.href || neverLink())
}

function neverLink(): never {
  throw new Error('No href')
}
