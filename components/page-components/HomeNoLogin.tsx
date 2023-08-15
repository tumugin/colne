'use client'

import {
  Button,
  ContentLayout,
  Header,
  SpaceBetween,
} from '@cloudscape-design/components'
import { loginPath } from 'utils/urls'
import { TopHeaderContent } from 'components/top/TopHeaderContent'
import React from 'react'

export function HomeNoLogin() {
  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          actions={
            <SpaceBetween size="s" direction="horizontal">
              <Button variant="primary" href={loginPath}>
                ログイン
              </Button>
              <Button variant="primary" href={loginPath}>
                新規登録
              </Button>
            </SpaceBetween>
          }
        />
      }
    >
      <TopHeaderContent />
    </ContentLayout>
  )
}
