import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getUserCreatedGroupList } from 'api-client/group'
import { GroupList } from 'components/page-components/GroupList'
import { applicationName } from 'libs/app-const'

export const metadata = {
  title: `グループ一覧 - ${applicationName}`,
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page: number | undefined }
}) {
  const header = getAuthCookieNextHeaders()
  const userCreatedGroups = await getUserCreatedGroupList(
    { page: searchParams.page ?? 1 },
    header,
  )

  return (
    <>
      <GroupList userCreatedGroup={userCreatedGroups} />
    </>
  )
}
