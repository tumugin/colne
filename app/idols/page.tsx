import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getUserCreatedIdols } from 'api-client/idol'
import { IdolList } from 'components/page-components/IdolList'
import { applicationName } from 'libs/app-const'

export const metadata = {
  title: `アイドル一覧 - ${applicationName}`,
}

export default async function Page(props: {
  searchParams: Promise<{ page: string | undefined }>
}) {
  const searchParams = await props.searchParams
  const header = getAuthCookieNextHeaders()

  const userCreatedIdols = await getUserCreatedIdols(
    { page: parseInt(searchParams.page ?? '1') },
    header,
  )

  return (
    <>
      <IdolList userCreatedIdol={userCreatedIdols} />
    </>
  )
}
