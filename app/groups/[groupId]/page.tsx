import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getGroup } from 'api-client/group'
import { handleColneException } from 'utils/error-aware-page-utils'
import { GroupById } from 'components/page-components/GroupById'
import { RevalidatePage } from 'components/next-utils/RevalidatePage'

export const dynamic = 'force-dynamic'

export default async function Page({
  params,
}: {
  params: { groupId: string }
}) {
  const header = getAuthCookieNextHeaders()

  try {
    const group = await getGroup({ groupId: params.groupId }, header)

    return (
      <>
        <RevalidatePage />
        <GroupById group={group} />
      </>
    )
  } catch (e) {
    handleColneException(e)
  }
}
