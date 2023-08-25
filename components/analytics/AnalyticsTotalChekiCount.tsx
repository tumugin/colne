import { Box, SpaceBetween } from '@cloudscape-design/components'
import React from 'react'
import styled from 'styled-components'

const BottomAlignText = styled(SpaceBetween)`
  align-items: flex-end;
  justify-content: center;
`

export function AnalyticsTotalChekiCount({
  totalChekiCount,
}: {
  totalChekiCount: number
}) {
  if (totalChekiCount === 0) {
    return (
      <Box textAlign="center" color="inherit">
        <b>データなし</b>
        <Box variant="p" color="inherit">
          今月撮影されたチェキはありません
        </Box>
      </Box>
    )
  }

  return (
    <BottomAlignText size="xs" direction="horizontal">
      <Box fontSize="display-l" textAlign="center">
        {totalChekiCount.toLocaleString('ja-JP')}
      </Box>
      <Box fontSize="heading-xl">枚</Box>
    </BottomAlignText>
  )
}
