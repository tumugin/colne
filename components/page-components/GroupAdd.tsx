'use client'

import { useCallback } from 'react'
import {
  GroupEditOrCreateForm,
  GroupEditOrCreateFormContents,
} from 'components/groups/GroupEditOrCreateForm'
import { mapEditorGroupStatusToGraphQlType } from 'utils/map-group-statuses'
import { groupDetailPage } from 'utils/urls'
import { ContentLayout } from '@cloudscape-design/components'
import { addGroup } from 'api-client/group'
import { useRouter } from 'next/navigation'

export function GroupAdd() {
  const router = useRouter()
  const handleOnCancel = useCallback(() => {
    router.back()
  }, [router])
  const handleOnSubmit = useCallback(
    async (data: GroupEditOrCreateFormContents) => {
      const result = await addGroup({
        group: {
          groupName: data.name,
          groupStatus: mapEditorGroupStatusToGraphQlType(data.status),
        },
      })
      await router.push(groupDetailPage(result.groupId))
    },
    [router],
  )

  return (
    <ContentLayout>
      <GroupEditOrCreateForm
        onSubmit={handleOnSubmit}
        onCancel={handleOnCancel}
      />
    </ContentLayout>
  )
}
