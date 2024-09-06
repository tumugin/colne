import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getGroup } from 'api-client/group'
import { handleColneException } from 'utils/error-aware-page-utils'
import { GroupById } from 'components/page-components/GroupById'
import { getCurrentUser } from 'api-client/user'
import { applicationName } from 'libs/app-const'

export default async function Page({
  params,
}: {
  params: { groupId: string }
}) {
  const header = getAuthCookieNextHeaders()

  try {
    const group = await getGroup({ groupId: params.groupId }, header)
    const currentUser = await getCurrentUser(header)

    return (
      <>
        <GroupById group={group} currentUser={currentUser} />
      </>
    )
  } catch (e) {
    handleColneException(e)
  }
}

export async function generateMetadata({
  params,
}: {
  params: { groupId: string }
}) {
  const header = getAuthCookieNextHeaders()
  const group = await getGroup({ groupId: params.groupId }, header)

  return {
    title: `${group.groupName} - ${applicationName}`,
  }
}
