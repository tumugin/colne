'use client'

import { addRegulationToGroup, Group } from 'api-client/group'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { ContentLayout } from '@cloudscape-design/components'
import {
  RegulationEditOrCreateForm,
  RegulationEditOrCreateFormProps,
} from 'components/regulations/RegulationEditOrCreateForm'
import { groupDetailPage } from 'utils/urls'
import { RegulationStatus } from 'graphql/generated/client'
import { never } from 'utils/never'

export function GroupRegulationAdd({ group }: { group: Group }) {
  const router = useRouter()
  const handleOnCancel = useCallback(() => {
    router.back()
  }, [router])
  const handleOnAddRegulation = useCallback(
    async (values: RegulationEditOrCreateFormProps) => {
      await addRegulationToGroup({
        groupId: group.groupId,
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
    [group.groupId, router],
  )

  return (
    <ContentLayout>
      <RegulationEditOrCreateForm
        targetGroup={group}
        onSubmit={handleOnAddRegulation}
        onCancel={handleOnCancel}
      />
    </ContentLayout>
  )
}
