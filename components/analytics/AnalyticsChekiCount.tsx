import {
  Box,
  Container,
  Link,
  SpaceBetween,
} from '@cloudscape-design/components'
import { idolDetailPage } from 'utils/urls'
import { onFollowNextLink } from 'utils/router'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import * as awsui from '@cloudscape-design/design-tokens'
import { useRouter } from 'next/navigation'

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${awsui.spaceScaledXl};
  place-items: start center;
  grid-auto-rows: minmax(0, auto);

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 380px) {
    grid-template-columns: 1fr;
  }
`

const IdolChekiCount = styled(Container)`
  width: 100%;
  height: 100%;

  > div {
    height: 100%;
  }
`

const BottomContainer = styled.div`
  display: grid;
  height: 100%;
  place-items: center;
`

const BottomAlignText = styled(SpaceBetween)`
  align-items: flex-end;
  justify-content: center;
`

export function AnalyticsChekiCount({
  chekiCounts,
}: {
  chekiCounts: {
    chekiCount: number
    idol?: {
      idolId: string
      idolName: string
    } | null
  }[]
}) {
  const router = useRouter()
  const sortedChekiCounts = useMemo(
    () => [...chekiCounts].sort((a, b) => b.chekiCount - a.chekiCount),
    [chekiCounts],
  )

  if (chekiCounts.length === 0) {
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
    <ContentGrid>
      {sortedChekiCounts.map((chekiCount, id) => (
        <IdolChekiCount
          key={id}
          header={
            chekiCount.idol ? (
              <Link
                variant="secondary"
                fontSize="heading-l"
                href={idolDetailPage(chekiCount.idol.idolId)}
                onFollow={(e) => onFollowNextLink(router, e)}
              >
                {chekiCount.idol?.idolName}
              </Link>
            ) : (
              <Box fontSize="heading-l">削除されたアイドル</Box>
            )
          }
        >
          <BottomContainer>
            <BottomAlignText size="xs" direction="horizontal">
              <Box fontSize="display-l" textAlign="center">
                {chekiCount.chekiCount.toLocaleString('ja-JP')}
              </Box>
              <Box fontSize="heading-xl">枚</Box>
            </BottomAlignText>
          </BottomContainer>
        </IdolChekiCount>
      ))}
    </ContentGrid>
  )
}
