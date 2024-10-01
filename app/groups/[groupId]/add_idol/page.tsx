import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getUserCreatedIdols } from 'api-client/idol'
import { GroupAddIdol } from 'components/page-components/GroupAddIdol'
import { getGroup } from 'api-client/group'
import { applicationName } from 'libs/app-const'

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: { page: string | undefined }
  params: { groupId: string }
}) {
  const header = getAuthCookieNextHeaders()

  const userCreatedIdols = await getUserCreatedIdols(
    { page: parseInt(searchParams.page ?? '1') },
    header,
  )
  const group = await getGroup({ groupId: params.groupId }, header)

  return (
    <>
      <GroupAddIdol userCreatedIdol={userCreatedIdols} group={group} />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { groupId: string }
}) {
  const header = getAuthCookieNextHeaders()
  const group = await getGroup({ groupId: params.groupId }, header)

  return {
    title: `アイドルを追加 - ${group.groupName} - ${applicationName}`,
  }
}
