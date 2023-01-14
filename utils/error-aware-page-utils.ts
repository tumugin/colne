import { NextPageContext } from 'next'
import {
  ResourceHasNoPermissionException,
  ResourceNotAuthorized,
  ResourceNotFoundError,
} from 'exceptions/graphql-exceptions'

export interface ErrorAwarePageProps {
  error?: {
    error: 'not_found' | 'not_authorized' | 'forbidden'
    statusCode: number
  }
}

export function handleExceptionAndReturnErrorAwarePageProps(
  e: unknown,
  ctx: NextPageContext
): ErrorAwarePageProps {
  if (e instanceof ResourceNotFoundError) {
    if (ctx.res) {
      ctx.res.statusCode = 404
    }
    return {
      error: {
        error: 'not_found',
        statusCode: 404,
      },
    }
  } else if (e instanceof ResourceNotAuthorized) {
    if (ctx.res) {
      ctx.res.statusCode = 401
    }
    return {
      error: {
        error: 'not_authorized',
        statusCode: 401,
      },
    }
  } else if (e instanceof ResourceHasNoPermissionException) {
    if (ctx.res) {
      ctx.res.statusCode = 403
    }
    return {
      error: {
        error: 'forbidden',
        statusCode: 403,
      },
    }
  }

  throw e
}
