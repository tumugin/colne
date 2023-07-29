'use client'

import React, { useCallback } from 'react'
import {
  IdolEditOrCreateForm,
  IdolEditOrCreateFormContents,
} from 'components/idols/IdolEditOrCreateForm'
import {
  GraphQlTypeToEditorIdolStatus,
  mapEditorIdolStatusToGraphQlType,
} from 'utils/map-idol-statuses'
import { userCreatedIdolListPath } from 'utils/urls'
import { IdolStatus } from 'graphql/generated/client'
import { Alert } from '@cloudscape-design/components'
import { deleteIdol, Idol, updateIdol } from 'api-client/idol'
import { useRouter } from 'next/navigation'

export function IdolEdit({ idol }: { idol: Idol }) {
  const router = useRouter()
  const handleOnCancel = useCallback(() => {
    router.back()
  }, [router])
  const handleOnEditIdol = useCallback(
    async (updatedIdolParam: IdolEditOrCreateFormContents) => {
      await updateIdol(idol.idolId, {
        idolName: updatedIdolParam.name,
        idolStatus: mapEditorIdolStatusToGraphQlType(updatedIdolParam.status),
      })
      router.push(`/idols/${idol.idolId}`)
    },
    [idol.idolId, router],
  )
  const handleOnDelete = useCallback(async () => {
    await deleteIdol(idol.idolId)
    router.push(userCreatedIdolListPath)
  }, [idol.idolId, router])

  if (!idol) {
    return null
  }

  if (idol.idolStatus === IdolStatus.OperationDeleted) {
    return (
      <Alert type="error">
        運営によって削除されたアイドルは編集することができません
      </Alert>
    )
  }

  return (
    <IdolEditOrCreateForm
      onSubmit={handleOnEditIdol}
      onCancel={handleOnCancel}
      initialValue={{
        name: idol.idolName,
        status: GraphQlTypeToEditorIdolStatus(idol.idolStatus),
      }}
      onDelete={handleOnDelete}
      isEdit
    />
  )
}
