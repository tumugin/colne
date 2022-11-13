import { NextPageContext } from 'next'
import { IncomingHttpHeaders } from 'http'
import { AppContext } from 'next/app'

export function getRequestHeaderFromContext(ctx: NextPageContext) {
  if (!ctx.req) {
    return undefined
  }
  return createHeaders(ctx.req.headers)
}

export function getRequestHeaderFromAppContext(ctx: AppContext) {
  if (!ctx.ctx.req) {
    return undefined
  }
  return createHeaders(ctx.ctx.req?.headers)
}

function createHeaders(headers: IncomingHttpHeaders) {
  return {
    cookie: headers.cookie,
  } as Record<string, string>
}
