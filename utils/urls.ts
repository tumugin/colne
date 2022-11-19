export const loginPath = process.env.NEXT_PUBLIC_API_BASE_PATH + '/auth0/login'

export function loginPathWithReturnToURL(redirectPath: string) {
  return loginPath + '?return_to=' + encodeURI(redirectPath)
}

export const logoutPath =
  process.env.NEXT_PUBLIC_API_BASE_PATH + '/auth0/logout'
