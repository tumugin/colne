import { NextPage } from 'next'
import { wrapper } from 'store'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'
import { ContentLayout } from '@cloudscape-design/components'
import {
  IdolCreateForm,
  IdolCreateFormContents,
} from 'components/idols/create/IdolCreateForm'
import React, { useCallback } from 'react'
import Router from 'next/router'
import { useAddIdol } from 'store/idol/idolHooks'
import { IdolStatus } from 'graphql/generated/client'

const IdolCreate: NextPage = () => {
  const handleOnCancel = useCallback(() => {
    Router.back()
  }, [])
  const addIdol = useAddIdol()
  const handleOnAddIdol = useCallback(
    async (idol: IdolCreateFormContents) => {
      await addIdol({
        idol: {
          idolName: idol.name,
          idolStatus:
            idol.status === 'public'
              ? IdolStatus.PublicActive
              : IdolStatus.PrivateActive,
        },
      })
    },
    [addIdol]
  )

  return (
    <ContentLayout>
      <IdolCreateForm onCancel={handleOnCancel} onSubmit={handleOnAddIdol} />
    </ContentLayout>
  )
}

IdolCreate.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (ctx) => {
    const currentUser = store.getState().user.currentUser
    if (!currentUser) {
      await redirectIfNotLoggedIn(ctx)
    }
  }
)

export default IdolCreate
