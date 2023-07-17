'use client'

import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import React from 'react'

export function ColneRootStyled({ children }: { children: React.ReactNode }) {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      {children}
    </StyleSheetManager>
  )
}
