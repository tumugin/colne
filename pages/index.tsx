import type { NextPage } from 'next'
import React from 'react'
import { Button, ContentLayout, Header } from '@cloudscape-design/components'
import { TopHeaderContent } from 'components/top/TopHeaderContent'
import styled from 'styled-components'
import * as awsui from '@cloudscape-design/design-tokens'
import { useAppSelector, wrapper } from 'store'
import { loginPath } from 'utils/urls'
import {
  createThisMonthDateRange,
  updateCurrentUserChekiIdolCount,
} from 'store/cheki/chekiHooks'
import { getRequestHeaderFromContext } from 'utils/headers'
import dayjs from 'dayjs'
import { MonthlyChekiCounts } from 'components/top/MonthlyChekiCounts'

const ActionButtons = styled.div`
  display: flex;
  gap: ${awsui.spaceScaledS};
`
const Home: NextPage = () => {
  const userState = useAppSelector((state) => state.user)
  const chekiCounts = useAppSelector(
    (state) => state.cheki.currentUserChekiIdolCount
  )

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          actions={
            !userState.currentUser ? (
              <ActionButtons>
                <Button variant="primary" href={loginPath}>
                  ログイン
                </Button>
                <Button variant="primary" href={loginPath}>
                  新規登録
                </Button>
              </ActionButtons>
            ) : null
          }
        />
      }
    >
      {userState.currentUser ? (
        <MonthlyChekiCounts chekiCounts={chekiCounts ?? []} />
      ) : (
        <TopHeaderContent />
      )}
    </ContentLayout>
  )
}

Home.getInitialProps = wrapper.getInitialPageProps((store) => async (ctx) => {
  if (!store.getState().user.currentUser) {
    return
  }
  await store.dispatch((dispatch) =>
    updateCurrentUserChekiIdolCount(
      { ...createThisMonthDateRange(dayjs()) },
      dispatch,
      getRequestHeaderFromContext(ctx)
    )
  )
})

export default Home
