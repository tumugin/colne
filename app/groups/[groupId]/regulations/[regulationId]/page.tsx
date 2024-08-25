import { RevalidatePage } from 'components/next-utils/RevalidatePage'
import { GroupRegulationEdit } from 'components/page-components/GroupRegulationEdit'
import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getGroup, getRegulation } from 'api-client/group'
import { notFound } from 'next/navigation'
import { applicationName } from 'libs/app-const'

export default async function Page({
  params,
}: {
  params: { groupId: string; regulationId: string }
}) {
  const header = getAuthCookieNextHeaders()
  const group = await getGroup({ groupId: params.groupId }, header)
  const regulation = await getRegulation(
    { regulationId: params.regulationId },
    header,
  )

  if (regulation.groupId !== group.groupId) {
    notFound()
  }

  return (
    <>
      <RevalidatePage />
      <GroupRegulationEdit group={group} regulation={regulation} />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { groupId: string; regulationId: string }
}) {
  const header = getAuthCookieNextHeaders()
  const group = await getGroup({ groupId: params.groupId }, header)
  const regulation = await getRegulation(
    { regulationId: params.regulationId },
    header,
  )

  return {
    title: `${regulation.regulationName} - ${group.groupName} - ${applicationName}`,
  }
}
