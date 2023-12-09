'use client'

import {
  deleteRegulation,
  Group,
  Regulation,
  updateRegulation,
} from 'api-client/group'
import { Alert, ContentLayout } from '@cloudscape-design/components'
import {
  RegulationEditOrCreateForm,
  RegulationEditOrCreateFormProps,
} from 'components/regulations/RegulationEditOrCreateForm'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { RegulationStatus } from 'graphql/generated/client'
import { never } from 'utils/never'
import { groupDetailPage } from 'utils/urls'

export function GroupRegulationEdit({
  group,
  regulation,
}: {
  group: Group
  regulation: Regulation
}) {
  const router = useRouter()
  const handleOnCancel = useCallback(() => {
    router.back()
  }, [router])
  const handleOnUpdateRegulation = useCallback(
    async (values: RegulationEditOrCreateFormProps) => {
      await updateRegulation({
        groupId: group.groupId,
        regulationId: regulation.regulationId,
        regulationComment: values.regulationComment,
        regulationName: values.regulationName,
        regulationStatus:
          values.regulationStatus === 'ACTIVE'
            ? RegulationStatus.Active
            : values.regulationStatus === 'NOT_ACTIVE'
              ? RegulationStatus.NotActive
              : never(values.regulationStatus),
        regulationUnitPrice: values.regulationUnitPrice,
      })
      router.push(groupDetailPage(group.groupId))
    },
    [group.groupId, regulation.regulationId, router],
  )
  const handleOnDeleteRegulation = useCallback(async () => {
    await deleteRegulation({ regulationId: regulation.regulationId })
    router.push(groupDetailPage(group.groupId))
  }, [group.groupId, regulation.regulationId, router])

  if (regulation.regulationStatus === RegulationStatus.OperationDeleted) {
    return (
      <Alert type="error">
        運営によって削除されたレギュレーションは編集することができません
      </Alert>
    )
  }

  return (
    <ContentLayout>
      <RegulationEditOrCreateForm
        targetGroup={group}
        initialValues={{
          ...regulation,
          regulationStatus:
            regulation.regulationStatus === RegulationStatus.Active
              ? 'ACTIVE'
              : regulation.regulationStatus === RegulationStatus.NotActive
                ? 'NOT_ACTIVE'
                : never(regulation.regulationStatus),
        }}
        onSubmit={handleOnUpdateRegulation}
        onCancel={handleOnCancel}
        onDelete={handleOnDeleteRegulation}
        isEdit
      />
    </ContentLayout>
  )
}
