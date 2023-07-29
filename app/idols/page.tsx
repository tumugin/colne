import { getHackedNextHeaders } from 'libs/next/nextHeadersHack'
import { getUserCreatedIdols } from 'api-client/idol'
import { IdolList } from 'components/page-components/IdolList'

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

  return <IdolList userCreatedIdol={userCreatedIdols} />
}
