import { Header, Tabs } from '@cloudscape-design/components'

export function ChekiAddIdolSelectView({
  selectedIdolId,
  setSelectedIdolId,
}: {
  selectedIdolId: string
  setSelectedIdolId: (id: string) => void
}) {
  return (
    <>
      <Header>チェキを追加</Header>
      <Tabs
        tabs={[
          {
            label: '自分が登録したアイドル',
            id: 'first',
            content: 'First tab content area',
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
    </>
  )
}
