import { IdolCreate } from 'components/page-components/IdolCreate'
import { applicationName } from 'libs/app-const'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `アイドルを追加 - ${applicationName}`,
}

export default function IdolCreatePage() {
  return <IdolCreate />
}
