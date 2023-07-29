'use client'

import React, { useCallback } from 'react'
import {
  GroupEditOrCreateForm,
  GroupEditOrCreateFormContents,
} from 'components/groups/GroupEditOrCreateForm'
import {
  GraphQlTypeToEditorGroupStatus,
  mapEditorGroupStatusToGraphQlType,
} from 'utils/map-group-statuses'
import { groupDetailPage, userCreatedGroupsListPath } from 'utils/urls'
import { GroupStatus } from 'graphql/generated/client'
import { Alert, ContentLayout } from '@cloudscape-design/components'
import { useRouter } from 'next/navigation'
import { deleteGroup, Group, updateGroup } from 'api-client/group'

export function GroupEdit({ group }: { group: Group }) {
  const router = useRouter()
  const handleOnCancel = useCallback(() => {
    router.back()
  }, [router])
  const handleOnSubmit = useCallback(
    async (data: GroupEditOrCreateFormContents) => {
      await updateGroup(group.groupId, {
        groupName: data.name,
        groupStatus: mapEditorGroupStatusToGraphQlType(data.status),
      })
      await router.push(groupDetailPage(group.groupId))
    },
    [group.groupId, router],
  )
  const handleOnDelete = useCallback(async () => {
    await deleteGroup({ groupId: group.groupId })
    await router.push(userCreatedGroupsListPath)
  }, [group.groupId, router])

  if (group.groupStatus === GroupStatus.OperationDeleted) {
    return (
      <Alert type="error">
        運営によって削除されたグループは編集することができません
      </Alert>
    )
  }

  return (
    <ContentLayout>
      <GroupEditOrCreateForm
        onSubmit={handleOnSubmit}
        onCancel={handleOnCancel}
        initialValue={{
          name: group.groupName,
          status: GraphQlTypeToEditorGroupStatus(group.groupStatus),
        }}
        onDelete={handleOnDelete}
        isEdit
      />
    </ContentLayout>
  )
}
