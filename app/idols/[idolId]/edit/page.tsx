import { getHackedNextHeaders } from 'libs/next/nextHeadersHack'
import { getIdol } from 'api-client/idol'
import { handleColneException } from 'utils/error-aware-page-utils'
import { IdolEdit } from 'components/page-components/IdolEdit'

export default async function IdolEditPage({ params }: { params: { idolId: string } }) {
  const header = getHackedNextHeaders()

  try {
    const idol = await getIdol({ idolId: params.idolId }, header)

    return <IdolEdit idol={idol} />
  } catch (e) {
    handleColneException(e)
  }
}
