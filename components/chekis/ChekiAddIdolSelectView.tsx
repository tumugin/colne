import { Header, Tabs } from '@cloudscape-design/components'
import { UserCreatedIdolListViewWithStore } from 'components/idols/UserCreatedIdolListViewWithStore'
import { useMemo } from 'react'

export function ChekiAddIdolSelectView({
  selectedIdolId,
  setSelectedIdolId,
}: {
  selectedIdolId: string
  setSelectedIdolId: (id: string) => void
}) {
  const userCreatedIdolUI = useMemo(
    () => (
      <UserCreatedIdolListViewWithStore
        isSelectable
        selectedIdolId={selectedIdolId}
        onSelectionChange={setSelectedIdolId}
        hideHeader
        hideIdolStatus
      />
    ),
    [selectedIdolId, setSelectedIdolId],
  )
  return (
    <Tabs
      tabs={[
        {
          label: '自分が登録したアイドル',
          id: 'first',
          content: userCreatedIdolUI,
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
