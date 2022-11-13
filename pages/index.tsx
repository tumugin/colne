import type { NextPage } from 'next'
import React from 'react'
import { Button, ContentLayout, Header } from '@cloudscape-design/components'
import { TopHeaderContent } from 'components/top/TopHeaderContent'
import styled from 'styled-components'
import * as awsui from '@cloudscape-design/design-tokens'
import { useAppSelector } from 'store'

const ActionButtons = styled.div`
  display: flex;
  gap: ${awsui.spaceScaledS};
`
const Home: NextPage = () => {
  const userState = useAppSelector((state) => state.user)

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          actions={
            !userState.currentUser ? (
              <ActionButtons>
                <Button variant="primary">ログイン</Button>
                <Button variant="primary">新規登録</Button>
              </ActionButtons>
            ) : null
          }
        />
      }
    >
      <TopHeaderContent />
    </ContentLayout>
  )
}

export default Home
