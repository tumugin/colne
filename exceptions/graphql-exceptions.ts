import { ClientError } from 'graphql-request'

export class ResourceNotFoundError extends Error {}

export class ResourceHasNoPermissionException extends Error {}

export class ResourceNotAuthorized extends Error {}

export function mapAisuExceptionToColneExceptionAndThrow(
  aisuException: unknown
) {
  if (!(aisuException instanceof ClientError)) {
    throw aisuException
  }

  // NOT_FOUND
  const isResourceNotFoundError = aisuException.response.errors?.some(
    (error) => error.extensions?.type === 'NOT_FOUND'
  )
  // HAS_NO_PERMISSION
  const isResourceHasNoPermissionException =
    aisuException.response.errors?.some(
      (error) => error.extensions?.type === 'HAS_NO_PERMISSION'
    )
  // NOT_AUTHORIZED
  const isNotAuthorizedException = aisuException.response.errors?.some(
    (error) => error.extensions?.type === 'NOT_AUTHORIZED'
  )

  if (isResourceNotFoundError) {
    throw new ResourceNotFoundError()
  }
  if (isResourceHasNoPermissionException) {
    throw new ResourceHasNoPermissionException()
  }
  if (isNotAuthorizedException) {
    throw new ResourceNotAuthorized()
  }

  throw aisuException
}
