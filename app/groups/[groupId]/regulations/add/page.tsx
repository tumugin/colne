import { GroupRegulationAdd } from 'components/page-components/GroupRegulationAdd'
import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getGroup } from 'api-client/group'
import { applicationName } from 'libs/app-const'

export default async function Page(props: {
  params: Promise<{ groupId: string }>
}) {
  const params = await props.params
  const header = getAuthCookieNextHeaders()
  const group = await getGroup({ groupId: params.groupId }, header)

  return (
    <>
      <GroupRegulationAdd group={group} />
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ groupId: string }>
}) {
  const params = await props.params
  const header = getAuthCookieNextHeaders()
  const group = await getGroup({ groupId: params.groupId }, header)

  return {
    title: `レギュレーションを追加 - ${group.groupName} - ${applicationName}`,
  }
}
