import { IdolListView } from 'components/idols/IdolListView'
import { useAppSelector } from 'store'
import { useCallback, useEffect, useRef } from 'react'
import { useGetUserCreatedIdols } from 'store/idol/idolHooks'

export function UserCreatedIdolListViewWithStore({
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
  const getUserCreatedIdols = useGetUserCreatedIdols()
  const userCreatedIdolsStore = useAppSelector(
    (state) => state.idol.userCreatedIdols,
  )
  const onPageChange = useCallback(
    async (newPageNumber: number) => {
      void getUserCreatedIdols({ page: newPageNumber })
    },
    [getUserCreatedIdols],
  )
  const isFirstLoad = useRef(false)
  useEffect(() => {
    if (!isFirstLoad.current) {
      void getUserCreatedIdols({ page: 1 })
      isFirstLoad.current = true
    }
  }, [getUserCreatedIdols])

  return (
    <IdolListView
      idols={userCreatedIdolsStore.idols.map((idol) => ({
        name: idol.idolName,
        id: idol.idolId,
        status: idol.idolStatus,
        groups: idol.groups.map((group) => ({
          id: group.groupId,
          name: group.groupName,
        })),
      }))}
      isLoading={!userCreatedIdolsStore.isLoaded}
      totalPages={userCreatedIdolsStore.pageCount}
      currentPage={userCreatedIdolsStore.currentPage}
      onPageChange={onPageChange}
      isSelectable={isSelectable}
      onSelectionChange={onSelectionChange}
      selectedIdolId={selectedIdolId}
      hideHeader={hideHeader}
      hideIdolStatus={hideIdolStatus}
    />
  )
}
