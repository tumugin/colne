export const loginPath = process.env.NEXT_PUBLIC_API_BASE_PATH + '/auth0/login'

export const userCreatedIdolListPath = '/idols'

export const userCreatedGroupsListPath = '/groups'

export const userProfilePage = '/user/profile'

export function idolDetailPage(idolId: string) {
  return `/idols/${idolId}`
}

export function idolEditPage(idolId: string) {
  return `/idols/${idolId}/edit`
}

export function groupDetailPage(groupId: string) {
  return `/groups/${groupId}`
}

export function groupEditPage(groupId: string) {
  return `/groups/${groupId}/edit`
}

export function groupAddIdolPage(groupId: string) {
  return `/groups/${groupId}/add_idol`
}

export function groupAddRegulationPage(groupId: string) {
  return `/groups/${groupId}/regulations/add`
}

export function groupRegulationEditPage(groupId: string, regulationId: string) {
  return `/groups/${groupId}/regulations/${regulationId}`
}

export const groupCreatePage = '/groups/create'

export function loginPathWithReturnToURL(redirectPath: string) {
  return loginPath + '?return_to=' + encodeURI(redirectPath)
}

export const logoutPath =
  process.env.NEXT_PUBLIC_API_BASE_PATH + '/auth0/logout'

export const chekiAddPath = '/chekis/add'

export const chekiAnalyticsPath = '/chekis/analytics'
