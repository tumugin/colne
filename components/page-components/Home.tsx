'use client'

import { CurrentUser } from 'api-client/user'
import { Button, ContentLayout, Header } from '@cloudscape-design/components'
import { loginPath } from 'utils/urls'
import { MonthlyChekiCounts } from 'components/top/MonthlyChekiCounts'
import { TopHeaderContent } from 'components/top/TopHeaderContent'
import React from 'react'
import styled from 'styled-components'
import * as awsui from '@cloudscape-design/design-tokens'
import { CurrentUserChekiIdolCount } from 'api-client/cheki'

const ActionButtons = styled.div`
  display: flex;
  gap: ${awsui.spaceScaledS};
`

export function Home({
  currentUser,
  currentUserChekiCount,
}: {
  currentUser: CurrentUser | null
  currentUserChekiCount: CurrentUserChekiIdolCount[]
}) {
  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          actions={
            !currentUser ? (
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
      {currentUser ? (
        <MonthlyChekiCounts chekiCounts={currentUserChekiCount} />
      ) : (
        <TopHeaderContent />
      )}
    </ContentLayout>
  )
}
