'use client'

import { ContentLayout } from '@cloudscape-design/components'
import { LoginRequired } from 'components/login/LoginRequired'

export function Login({ returnTo }: { returnTo?: string }) {
  return (
    <ContentLayout>
      <LoginRequired returnTo={returnTo} />
    </ContentLayout>
  )
}
