import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { getIdol } from 'api-client/idol'
import { handleColneException } from 'utils/error-aware-page-utils'
import { IdolEdit } from 'components/page-components/IdolEdit'
import { applicationName } from 'libs/app-const'

export default async function IdolEditPage(props: {
  params: Promise<{ idolId: string }>
}) {
  const params = await props.params
  const header = await getAuthCookieNextHeaders()

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

export async function generateMetadata(props: {
  params: Promise<{ idolId: string }>
}) {
  const params = await props.params
  const header = await getAuthCookieNextHeaders()
  const idol = await getIdol({ idolId: params.idolId }, header)

  return {
    title: `アイドルを編集 - ${idol.idolName} - ${applicationName}`,
  }
}
