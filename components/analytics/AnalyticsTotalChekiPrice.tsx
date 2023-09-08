import styled from 'styled-components'
import { Box, SpaceBetween } from '@cloudscape-design/components'
import React, { useState } from 'react'

const BottomAlignText = styled(SpaceBetween)`
  align-items: flex-end;
  justify-content: center;
`

export function AnalyticsTotalChekiPrice({
  totalPrice,
  hidden,
}: {
  totalPrice: number
  hidden: boolean
}) {
  return (
    <BottomAlignText size="xs" direction="horizontal">
      <Box fontSize="display-l" textAlign="center">
        {hidden ? '******' : totalPrice.toLocaleString('ja-JP')}
      </Box>
      <Box fontSize="heading-xl">円</Box>
    </BottomAlignText>
  )
}
