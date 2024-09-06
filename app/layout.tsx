import '@cloudscape-design/global-styles/index.css'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from 'components/styled/StyledComponentsRegistry'
import { NextRecoilRoot } from 'recoil-store/NextRecoilRoot'
import { GlobalThemeHandler } from 'components/common/GlobalThemeHandler'
import React from 'react'
import { ColneRootStyled } from 'components/styled/ColneRootStyled'
import NextTopLoader from 'nextjs-toploader'
import { applicationName } from 'libs/app-const'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: applicationName,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} />
        <StyledComponentsRegistry>
          <ColneRootStyled>
            <NextRecoilRoot>
              <GlobalThemeHandler />
              {children}
            </NextRecoilRoot>
          </ColneRootStyled>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
