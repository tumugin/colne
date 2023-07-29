'use client'

import React, { useCallback } from 'react'
import { ContentLayout } from '@cloudscape-design/components'
import { IdolListView } from 'components/idols/IdolListView'
import { UserCreatedIdol } from 'api-client/idol'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { nonNullable } from 'utils/array'

export function IdolList({
  userCreatedIdol,
}: {
  userCreatedIdol: UserCreatedIdol
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
      <IdolListView
        idols={userCreatedIdol.idols.map((idol) => ({
          name: idol.idolName,
          id: idol.idolId,
          status: idol.idolStatus,
          groups: idol.groups.filter(nonNullable).map((group) => ({
            id: group.groupId,
            name: group.groupName,
          })),
        }))}
        isLoading={false}
        totalPages={userCreatedIdol.pageCount}
        currentPage={userCreatedIdol.currentPage}
        onPageChange={onPageChange}
      />
    </ContentLayout>
  )
}
