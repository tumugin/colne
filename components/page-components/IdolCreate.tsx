'use client'

import React, { useCallback } from 'react'
import {
  IdolEditOrCreateForm,
  IdolEditOrCreateFormContents,
} from 'components/idols/IdolEditOrCreateForm'
import { mapEditorIdolStatusToGraphQlType } from 'utils/map-idol-statuses'
import { idolDetailPage } from 'utils/urls'
import { ContentLayout } from '@cloudscape-design/components'
import { useRouter } from 'next/navigation'
import { addIdol } from 'api-client/idol'

export function IdolCreate() {
  const router = useRouter()
  const handleOnCancel = useCallback(() => {
    router.back()
  }, [router])
  const handleOnAddIdol = useCallback(
    async (idol: IdolEditOrCreateFormContents) => {
      const result = await addIdol({
        idol: {
          idolName: idol.name,
          idolStatus: mapEditorIdolStatusToGraphQlType(idol.status),
        },
      })
      router.push(idolDetailPage(result.idolId))
    },
    [router],
  )

  return (
    <ContentLayout>
      <IdolEditOrCreateForm
        onCancel={handleOnCancel}
        onSubmit={handleOnAddIdol}
      />
    </ContentLayout>
  )
}
