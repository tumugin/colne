import { Tabs } from '@cloudscape-design/components'
import { UserCreatedIdolListViewWithAPI } from 'components/idols/UserCreatedIdolListViewWithAPI'
import { UserCreatedGroupListViewWithExpandableIdolWithAPI } from 'components/groups/UserCreatedGroupListViewWithExpandableIdolWithAPI'

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
          label: 'アイドル',
          id: 'idol',
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
          label: 'グループ',
          id: 'group',
          content: (
            <UserCreatedGroupListViewWithExpandableIdolWithAPI
              isSelectable
              selectedIdolId={selectedIdolId}
              onSelectionChange={setSelectedIdolId}
              hideHeader
              hideGroupStatus
            />
          ),
        },
        {
          label: 'お気に入りのグループ',
          id: 'favorite_group',
          content: 'TODO',
          disabled: true,
        },
      ]}
    />
  )
}
