import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getUserCreatedIdols } from 'api-client/idol'
import { RevalidatePage } from 'components/next-utils/RevalidatePage'
import { GroupAddIdol } from 'components/page-components/GroupAddIdol'
import { getGroup } from 'api-client/group'

export const dynamic = 'force-dynamic'

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: { page: number | undefined }
  params: { groupId: string }
}) {
  const header = getAuthCookieNextHeaders()

  const userCreatedIdols = await getUserCreatedIdols(
    { page: searchParams.page ?? 1 },
    header,
  )
  const group = await getGroup({ groupId: params.groupId }, header)

  return (
    <>
      <RevalidatePage />
      <GroupAddIdol userCreatedIdol={userCreatedIdols} group={group} />
    </>
  )
}
