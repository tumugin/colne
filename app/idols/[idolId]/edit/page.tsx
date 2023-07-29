import { getHackedNextHeaders } from 'libs/next/nextHeadersHack'
import { getIdol } from 'api-client/idol'
import { handleColneException } from 'utils/error-aware-page-utils'
import { IdolEdit } from 'components/page-components/IdolEdit'
import { RevalidatePage } from 'components/next-utils/RevalidatePage'

export default async function IdolEditPage({
  params,
}: {
  params: { idolId: string }
}) {
  const header = getHackedNextHeaders()

  try {
    const idol = await getIdol({ idolId: params.idolId }, header)

    return (
      <>
        <RevalidatePage />
        <IdolEdit idol={idol} />
      </>
    )
  } catch (e) {
    handleColneException(e)
  }
}
