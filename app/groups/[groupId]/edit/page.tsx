import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getGroup } from 'api-client/group'
import { GroupEdit } from 'components/page-components/GroupEdit'
import { handleColneException } from 'utils/error-aware-page-utils'
import { applicationName } from 'libs/app-const'

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
        <GroupEdit group={group} />
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
    title: `グループを編集 - ${group.groupName} - ${applicationName}`,
  }
}
