import { Box, SpaceBetween } from '@cloudscape-design/components'
import styled from 'styled-components'
import React from 'react'

const BottomAlignText = styled(SpaceBetween)`
  align-items: flex-end;
  justify-content: center;
`

export function AnalyticsTopIdol({
  idol,
  chekiCount,
}: {
  idol: { idolId: string; idolName: string } | null
  chekiCount: number | null
}) {
  if (!idol || !chekiCount) {
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
        {idol.idolName}
      </Box>
      <Box fontSize="heading-xl">({chekiCount.toLocaleString('ja-JP')}枚)</Box>
    </BottomAlignText>
  )
}
