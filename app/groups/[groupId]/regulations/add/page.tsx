import { RevalidatePage } from 'components/next-utils/RevalidatePage'
import { GroupRegulationAdd } from 'components/page-components/GroupRegulationAdd'
import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getGroup } from 'api-client/group'

export default async function Page({
  params,
}: {
  params: { groupId: string }
}) {
  const header = getAuthCookieNextHeaders()
  const group = await getGroup({ groupId: params.groupId }, header)

  return (
    <>
      <RevalidatePage />
      <GroupRegulationAdd group={group} />
    </>
  )
}
