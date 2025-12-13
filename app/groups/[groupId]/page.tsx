import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getGroup } from 'api-client/group'
import { handleColneException } from 'utils/error-aware-page-utils'
import { GroupById } from 'components/page-components/GroupById'
import { getCurrentUser } from 'api-client/user'
import { applicationName } from 'libs/app-const'

export default async function Page(props: {
  params: Promise<{ groupId: string }>
}) {
  const params = await props.params
  const header = await getAuthCookieNextHeaders()

  let group
  let currentUser
  try {
    group = await getGroup({ groupId: params.groupId }, header)
    currentUser = await getCurrentUser(header)
  } catch (e) {
    handleColneException(e)
  }

  return (
    <>
      <GroupById group={group!} currentUser={currentUser!} />
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ groupId: string }>
}) {
  const params = await props.params
  const header = await getAuthCookieNextHeaders()
  const group = await getGroup({ groupId: params.groupId }, header)

  return {
    title: `${group.groupName} - ${applicationName}`,
  }
}
