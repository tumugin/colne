import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getUserAllChekis } from 'api-client/cheki'
import { AllChekis } from 'components/page-components/AllChekis'

export default async function Page(props: {
  searchParams: Promise<{ page?: string }>
}) {
  const searchParams = await props.searchParams
  const header = await getAuthCookieNextHeaders()
  const allChekis = await getUserAllChekis(
    Number(searchParams.page ?? '1'),
    header,
  )

  return (
    <AllChekis
      currentPage={allChekis.currentPage}
      count={allChekis.count}
      pageCount={allChekis.pageCount}
      chekis={allChekis.chekis}
    />
  )
}
