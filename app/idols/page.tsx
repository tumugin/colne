import { getHackedNextHeaders } from 'libs/next/nextHeadersHack'
import { getUserCreatedIdols } from 'api-client/idol'
import { IdolList } from 'components/page-components/IdolList'
import { RevalidatePage } from 'components/next-utils/RevalidatePage'

export default async function Page({
  searchParams,
}: {
  searchParams: { page: number | undefined }
}) {
  const header = getHackedNextHeaders()

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
