import { IdolListView } from 'components/idols/IdolListView'
import { useCallback, useState } from 'react'
import { getUserCreatedIdols, UserCreatedIdol } from 'api-client/idol'
import { nonNullable } from 'utils/array'
import { useOnFirstMount } from 'utils/onFirstMount'

export function UserCreatedIdolListViewWithAPI({
  isSelectable,
  onSelectionChange,
  selectedIdolId,
  hideHeader,
  hideIdolStatus,
}: {
  isSelectable?: boolean
  onSelectionChange?: (selectedIdolId: string) => void
  selectedIdolId?: string
  hideHeader?: boolean
  hideIdolStatus?: boolean
}) {
  const [userCreatedIdolsStore, setUserCreatedIdolStore] =
    useState<UserCreatedIdol | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const onPageChange = useCallback(async (newPageNumber: number) => {
    setIsLoading(true)
    setUserCreatedIdolStore(await getUserCreatedIdols({ page: newPageNumber }))
    setIsLoading(false)
  }, [])

  useOnFirstMount(async () => {
    setUserCreatedIdolStore(await getUserCreatedIdols({ page: 1 }))
    setIsLoading(false)
  })

  return (
    <IdolListView
      idols={
        userCreatedIdolsStore?.idols.map((idol) => ({
          name: idol.idolName,
          id: idol.idolId,
          status: idol.idolStatus,
          groups: idol.groups.filter(nonNullable).map((group) => ({
            id: group.groupId,
            name: group.groupName,
          })),
        })) ?? []
      }
      isLoading={isLoading}
      totalPages={userCreatedIdolsStore?.pageCount ?? 1}
      currentPage={userCreatedIdolsStore?.currentPage ?? 1}
      onPageChange={onPageChange}
      isSelectable={isSelectable}
      onSelectionChange={onSelectionChange}
      selectedIdolId={selectedIdolId}
      hideHeader={hideHeader}
      hideIdolStatus={hideIdolStatus}
    />
  )
}
