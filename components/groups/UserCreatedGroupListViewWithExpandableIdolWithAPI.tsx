import { useState } from 'react'
import { GroupListViewWithExpandableIdol } from 'components/groups/GroupListViewWithExpandableIdol'
import { useOnFirstMount } from 'utils/onFirstMount'
import {
  getUserCreatedGroupListWithIdols,
  UserCreatedGroupWithIdol,
} from 'api-client/group'
import { nonNullable } from 'utils/array'

export function UserCreatedGroupListViewWithExpandableIdolWithAPI({
  isSelectable,
  selectedIdolId,
  hideHeader,
  hideGroupStatus,
  onSelectionChange,
}: {
  isSelectable?: boolean
  selectedIdolId?: string
  hideHeader?: boolean
  hideGroupStatus?: boolean
  onSelectionChange?: (selectedIdolId: string) => void
}) {
  const [userCreatedGroupsStore, setUserCreatedGroupsStore] =
    useState<UserCreatedGroupWithIdol | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const onPageChange = async (newPageNumber: number) => {
    setIsLoading(true)
    setUserCreatedGroupsStore(
      await getUserCreatedGroupListWithIdols({ page: newPageNumber }),
    )
    setIsLoading(false)
  }

  useOnFirstMount(async () => {
    setUserCreatedGroupsStore(
      await getUserCreatedGroupListWithIdols({ page: 1 }),
    )
    setIsLoading(false)
  })

  return (
    <GroupListViewWithExpandableIdol
      groups={
        userCreatedGroupsStore?.groups.map((group) => ({
          name: group.groupName,
          id: group.groupId,
          status: group.groupStatus,
          idols: group.idols.filter(nonNullable).map((idol) => ({
            name: idol.idolName,
            id: idol.idolId,
            status: idol.idolStatus,
            groups: idol.groups.filter(nonNullable).map((group) => ({
              id: group.groupId,
              name: group.groupName,
            })),
          })),
        })) ?? []
      }
      isLoading={isLoading}
      currentPage={userCreatedGroupsStore?.currentPage ?? 1}
      totalPages={userCreatedGroupsStore?.pageCount ?? 1}
      onPageChange={onPageChange}
      isSelectable={isSelectable}
      selectedIdolId={selectedIdolId}
      onSelectionChange={onSelectionChange}
      hideHeader={hideHeader}
      hideGroupStatus={hideGroupStatus}
    />
  )
}
