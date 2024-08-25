import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getUserCreatedIdols } from 'api-client/idol'
import { IdolList } from 'components/page-components/IdolList'
import { RevalidatePage } from 'components/next-utils/RevalidatePage'
import { applicationName } from 'libs/app-const'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `アイドル一覧 - ${applicationName}`,
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page: number | undefined }
}) {
  const header = getAuthCookieNextHeaders()

  const userCreatedIdols = await getUserCreatedIdols(
    { page: searchParams.page ?? 1 },
    header,
  )

  return (
    <>
      <RevalidatePage />
      <IdolList userCreatedIdol={userCreatedIdols} />
    </>
  )
}
