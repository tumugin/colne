import { NextPage } from 'next'
import { wrapper } from 'store'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'
import { ContentLayout } from '@cloudscape-design/components'
import {
  IdolEditOrCreateForm,
  IdolEditOrCreateFormContents,
} from 'components/idols/IdolEditOrCreateForm'
import React, { useCallback } from 'react'
import { useAddIdol } from 'store/idol/idolHooks'
import { useRouter } from 'next/router'
import { idolDetailPage } from 'utils/urls'
import { mapEditorIdolStatusToGraphQlType } from 'utils/map-idol-statuses'

const IdolCreate: NextPage = () => {
  const router = useRouter()
  const handleOnCancel = useCallback(() => {
    router.back()
  }, [router])
  const addIdol = useAddIdol()
  const handleOnAddIdol = useCallback(
    async (idol: IdolEditOrCreateFormContents) => {
      const result = await addIdol({
        idol: {
          idolName: idol.name,
          idolStatus: mapEditorIdolStatusToGraphQlType(idol.status),
        },
      })
      await router.push(idolDetailPage(result.idolId))
    },
    [addIdol, router],
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

IdolCreate.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (ctx) => {
    const currentUser = store.getState().user.currentUser
    if (!currentUser) {
      await redirectIfNotLoggedIn(ctx)
    }
  },
)

export default IdolCreate
