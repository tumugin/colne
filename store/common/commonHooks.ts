import { AppDispatch } from 'store/index'
import { colneGraphQLSdk } from 'graphql/client'
import { commonSlice } from 'store/common/commonStore'

export async function updateCSRFToken(
  dispatch: AppDispatch,
  headers?: Record<string, string>
) {
  const csrfToken = await colneGraphQLSdk.GetCSRFToken(undefined, headers)
  await dispatch(commonSlice.actions.updateCsrfToken(csrfToken.getCsrfToken))
}
