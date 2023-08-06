'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { UserCreatedGroup } from 'api-client/group'
import { ContentLayout } from '@cloudscape-design/components'
import { GroupListView } from 'components/groups/GroupListView'

export function GroupList({
  userCreatedGroup,
}: {
  userCreatedGroup: UserCreatedGroup
}) {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const onPageChange = useCallback(
    async (newPageNumber: number) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      current.set('page', newPageNumber.toString())
      router.push(`${pathName}?${current.toString()}`)
    },
    [pathName, router, searchParams],
  )

  return (
    <ContentLayout>
      <GroupListView
        groups={userCreatedGroup.groups.map((group) => ({
          name: group.groupName,
          id: group.groupId,
          status: group.groupStatus,
        }))}
        isLoading={false}
        totalPages={userCreatedGroup.pageCount}
        currentPage={userCreatedGroup.currentPage}
        onPageChange={onPageChange}
      />
    </ContentLayout>
  )
}
