import { getHackedNextHeaders } from 'libs/next/nextHeadersHack'
import { getGroup } from 'api-client/group'
import { GroupEdit } from 'components/page-components/GroupEdit'
import { handleColneException } from 'utils/error-aware-page-utils'
import { RevalidatePage } from 'components/next-utils/RevalidatePage'

export default async function Page({
  params,
}: {
  params: { groupId: string }
}) {
  const header = getHackedNextHeaders()
  try {
    const group = await getGroup({ groupId: params.groupId }, header)

    return (
      <>
        <RevalidatePage />
        <GroupEdit group={group} />
      </>
    )
  } catch (e) {
    handleColneException(e)
  }
}
