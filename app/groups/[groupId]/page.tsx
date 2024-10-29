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
