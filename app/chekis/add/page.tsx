import { ChekisAdd } from 'components/page-components/ChekisAdd'
import { applicationName } from 'libs/app-const'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `チェキを追加 - ${applicationName}`,
}

export default async function PageAdd() {
  return <ChekisAdd />
}
