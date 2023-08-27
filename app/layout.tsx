import '@cloudscape-design/global-styles/index.css'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from 'components/styled/StyledComponentsRegistry'
import { ColneAppWithLayout } from 'components/common/ColneAppWithLayout'
import { getCurrentUser } from 'api-client/user'
import { getCSRFToken } from 'api-client/common'
import { NextRecoilRoot } from 'recoil-store/NextRecoilRoot'
import { getAuthCookieNextHeaders } from 'libs/next/nextHeadersHack'
import { GlobalThemeHandler } from 'components/common/GlobalThemeHandler'
import React from 'react'
import { ColneRootStyled } from 'components/styled/ColneRootStyled'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'チェキを管理するやつ(仮)',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = getAuthCookieNextHeaders()
  const currentUser = await getCurrentUser(header)
  const csrfToken = await getCSRFToken(header)

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} />
        <StyledComponentsRegistry>
          <ColneRootStyled>
            <NextRecoilRoot>
              <GlobalThemeHandler />
              <ColneAppWithLayout user={currentUser} csrfToken={csrfToken}>
                {children}
              </ColneAppWithLayout>
            </NextRecoilRoot>
          </ColneRootStyled>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
