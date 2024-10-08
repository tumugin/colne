import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getIdol } from 'api-client/idol'
import { handleColneException } from 'utils/error-aware-page-utils'
import { IdolEdit } from 'components/page-components/IdolEdit'
import { applicationName } from 'libs/app-const'

export default async function IdolEditPage({
  params,
}: {
  params: { idolId: string }
}) {
  const header = getAuthCookieNextHeaders()

  try {
    const idol = await getIdol({ idolId: params.idolId }, header)

    return (
      <>
        <IdolEdit idol={idol} />
      </>
    )
  } catch (e) {
    handleColneException(e)
  }
}

export async function generateMetadata({
  params,
}: {
  params: { idolId: string }
}) {
  const header = getAuthCookieNextHeaders()
  const idol = await getIdol({ idolId: params.idolId }, header)

  return {
    title: `アイドルを編集 - ${idol.idolName} - ${applicationName}`,
  }
}
