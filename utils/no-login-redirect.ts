import { NextPageContext } from 'next'
import Router from 'next/router'

export async function redirectIfNotLoggedIn(ctx: NextPageContext) {
  const queryParams = new URLSearchParams({ return_to: ctx.asPath ?? '' })
  if (typeof window === 'undefined') {
    await ctx.res?.writeHead(302, {
      Location: '/login?' + queryParams.toString(),
    })
    await ctx.res?.end()
  } else {
    await Router.push('/login?' + queryParams.toString())
  }
}
