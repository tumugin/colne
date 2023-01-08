import { NextPage } from 'next'
import { wrapper } from 'store'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'
import { ContentLayout } from '@cloudscape-design/components'
import { IdolCreateForm } from 'components/idols/create/IdolCreateForm'
import React, { useCallback, useState } from 'react'
import Router from 'next/router'

const IdolCreate: NextPage = () => {
  const handleOnCancel = useCallback(() => {
    Router.back()
  }, [])

  return (
    <ContentLayout>
      <IdolCreateForm onCancel={handleOnCancel} />
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
