import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getGroup } from 'api-client/group'
import { GroupEdit } from 'components/page-components/GroupEdit'
import { handleColneException } from 'utils/error-aware-page-utils'
import { applicationName } from 'libs/app-const'

export default async function Page(props: {
  params: Promise<{ groupId: string }>
}) {
  const params = await props.params
  const header = await getAuthCookieNextHeaders()

  let group
  try {
    group = await getGroup({ groupId: params.groupId }, header)
  } catch (e) {
    handleColneException(e)
  }

  return (
    <>
      <GroupEdit group={group!} />
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ groupId: string }>
}) {
  const params = await props.params
  const header = await getAuthCookieNextHeaders()
  const group = await getGroup({ groupId: params.groupId }, header)

  return {
    title: `グループを編集 - ${group.groupName} - ${applicationName}`,
  }
}
