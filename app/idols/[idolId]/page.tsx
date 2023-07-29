import { getHackedNextHeaders } from 'libs/next/nextHeadersHack'
import { handleColneException } from 'utils/error-aware-page-utils'
import { IdolById } from 'components/page-components/IdolById'
import { getIdol } from 'api-client/idol'
import { getIdolChekisWithDateRange } from 'api-client/cheki'
import dayjs from 'dayjs'
import { getCurrentUser } from 'api-client/user'

export default async function Page({
  params,
  searchParams,
}: {
  params: { idolId: string }
  searchParams: {
    chekiStart: string | undefined
    chekiEnd: string | undefined
  }
}) {
  const header = getHackedNextHeaders()
  const start = searchParams.chekiStart
    ? dayjs(searchParams.chekiStart)
    : dayjs().subtract(1, 'months')
  const end = searchParams.chekiEnd ? dayjs(searchParams.chekiEnd) : dayjs()

  const currentUser = await getCurrentUser(header)

  try {
    const idol = await getIdol({ idolId: params.idolId }, header)
    const idolChekis = await getIdolChekisWithDateRange(
      params.idolId,
      {
        startDate: start,
        endDate: end,
      },
      header,
    )

    return (
      <IdolById
        idol={idol}
        idolChekis={idolChekis}
        range={{
          startISOString: start.toISOString(),
          endISOString: end.toISOString(),
        }}
        currentUser={currentUser}
      />
    )
  } catch (e) {
    handleColneException(e)
  }
}
