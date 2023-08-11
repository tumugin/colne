'use client'

import { Group, removeIdol } from 'api-client/group'
import { ContentLayout, SpaceBetween } from '@cloudscape-design/components'
import { GroupDetailView } from 'components/groups/GroupDetailView'
import { GroupIdolList } from 'components/groups/GroupIdolList'
import { nonNullable } from 'utils/array'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export function GroupById({ group }: { group: Group }) {
  const router = useRouter()
  const onRemoveIdol = useCallback(
    async (idolId: string) => {
      await removeIdol({ groupId: group.groupId, idolId })
      router.refresh()
    },
    [group.groupId, router],
  )

  return (
    <ContentLayout>
      <SpaceBetween size="xxl">
        <GroupDetailView group={group} />
        <GroupIdolList
          idols={group.idols.filter(nonNullable)}
          onRemoveIdol={onRemoveIdol}
        />
      </SpaceBetween>
    </ContentLayout>
  )
}
