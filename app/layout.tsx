import '@cloudscape-design/global-styles/index.css'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from 'components/styled/StyledComponentsRegistry'
import { ColneAppWithLayout } from 'components/common/ColneAppWithLayout'
import { getCurrentUser } from 'api-client/user'
import { getCSRFToken } from 'api-client/common'
import { NextRecoilRoot } from 'recoil-store/NextRecoilRoot'
import { getHackedNextHeaders } from 'libs/next/nextHeadersHack'
import { GlobalThemeHandler } from 'components/common/GlobalThemeHandler'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = getHackedNextHeaders()
  const currentUser = await getCurrentUser(header)
  const csrfToken = await getCSRFToken(header)

  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <NextRecoilRoot>
            <GlobalThemeHandler />
            <ColneAppWithLayout user={currentUser} csrfToken={csrfToken}>
              {children}
            </ColneAppWithLayout>
          </NextRecoilRoot>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}