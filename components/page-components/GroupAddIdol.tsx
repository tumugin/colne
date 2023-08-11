'use client'

import { UserCreatedIdol } from 'api-client/idol'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import {
  Button,
  ContentLayout,
  Header,
  SpaceBetween,
} from '@cloudscape-design/components'
import { IdolListView } from 'components/idols/IdolListView'
import { nonNullable } from 'utils/array'
import { addIdolToGroup, Group } from 'api-client/group'
import { groupDetailPage } from 'utils/urls'

export function GroupAddIdol({
  userCreatedIdol,
  group,
}: {
  userCreatedIdol: UserCreatedIdol
  group: Group
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

  const [selectedIdolId, setSelectedIdolId] = useState<string | null>(null)

  const onAddIdol = useCallback(async () => {
    if (!selectedIdolId) {
      return
    }

    await addIdolToGroup({ groupId: group.groupId, idolId: selectedIdolId })
    router.push(groupDetailPage(group.groupId))
  }, [group.groupId, router, selectedIdolId])

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
        onSelectionChange={setSelectedIdolId}
        selectedIdolId={selectedIdolId ?? undefined}
        isSelectable
        header={
          <Header
            actions={
              <SpaceBetween size="s" direction="horizontal">
                <Button
                  variant="primary"
                  onClick={onAddIdol}
                  disabled={!selectedIdolId}
                >
                  新しく登録する
                </Button>
              </SpaceBetween>
            }
            variant="h2"
          >
            {group.groupName}に追加するアイドルを選択してください
          </Header>
        }
      />
    </ContentLayout>
  )
}
