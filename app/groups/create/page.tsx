import { GroupAdd } from 'components/page-components/GroupAdd'
import { applicationName } from 'libs/app-const'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: `グループを追加 - ${applicationName}`,
}

export default function Page() {
  return <GroupAdd />
}
