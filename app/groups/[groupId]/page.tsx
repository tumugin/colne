import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getGroup } from 'api-client/group'
import { handleColneException } from 'utils/error-aware-page-utils'
import { GroupById } from 'components/page-components/GroupById'
import { RevalidatePage } from 'components/next-utils/RevalidatePage'
import { getCurrentUser } from 'api-client/user'

export const dynamic = 'force-dynamic'

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
        <RevalidatePage />
        <GroupById group={group} currentUser={currentUser} />
      </>
    )
  } catch (e) {
    handleColneException(e)
  }
}
