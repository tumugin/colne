import { Tabs } from '@cloudscape-design/components'
import { UserCreatedIdolListViewWithAPI } from 'components/idols/UserCreatedIdolListViewWithAPI'

export function ChekiAddIdolSelectView({
  selectedIdolId,
  setSelectedIdolId,
}: {
  selectedIdolId: string
  setSelectedIdolId: (id: string) => void
}) {
  return (
    <Tabs
      tabs={[
        {
          label: '自分が登録したアイドル',
          id: 'first',
          content: (
            <UserCreatedIdolListViewWithAPI
              isSelectable
              selectedIdolId={selectedIdolId}
              onSelectionChange={setSelectedIdolId}
              hideHeader
              hideIdolStatus
            />
          ),
        },
        {
          label: '自分が登録したグループ',
          id: 'second',
          content: 'TODO',
          disabled: true,
        },
        {
          label: 'お気に入りのグループ',
          id: 'third',
          content: 'TODO',
          disabled: true,
        },
      ]}
    />
  )
}
