import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getUserCreatedIdols } from 'api-client/idol'
import { GroupAddIdol } from 'components/page-components/GroupAddIdol'
import { getGroup } from 'api-client/group'
import { applicationName } from 'libs/app-const'

export default async function Page(props: {
  searchParams: Promise<{ page: string | undefined }>
  params: Promise<{ groupId: string }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const header = await getAuthCookieNextHeaders()

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

export async function generateMetadata(props: {
  params: Promise<{ groupId: string }>
}) {
  const params = await props.params
  const header = await getAuthCookieNextHeaders()
  const group = await getGroup({ groupId: params.groupId }, header)

  return {
    title: `アイドルを追加 - ${group.groupName} - ${applicationName}`,
  }
}
