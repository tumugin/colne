import {
  Box,
  Container,
  Header,
  Link,
  PieChart,
  SpaceBetween,
} from '@cloudscape-design/components'
import styled from 'styled-components'
import * as awsui from '@cloudscape-design/design-tokens'
import React, { useMemo } from 'react'
import { idolDetailPage } from 'utils/urls'
import { onFollowNextLink } from 'utils/router'
import { useRouter } from 'next/navigation'
import { useIsSmartphoneScreenSize } from 'libs/dom/screen-size'
import { ChekiByIdolAnalytics } from 'components/analytics/ChekiByIdolAnalytics'

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${awsui.spaceScaledXl};
  place-items: start center;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

const IdolChekiCount = styled(Container)`
  width: 100%;
`

const BottomAlignText = styled(SpaceBetween)`
  align-items: flex-end;
  justify-content: center;
`

export function MonthlyChekiCounts({
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
  const isSmartphoneScreenSize = useIsSmartphoneScreenSize()

  return (
    <SpaceBetween size="xl" direction="vertical">
      <Container header={<Header variant="h2">今月のチェキ撮影枚数</Header>}>
        {chekiCounts.length === 0 ? (
          <Box textAlign="center" color="inherit">
            <b>データなし</b>
            <Box variant="p" color="inherit">
              今月撮影されたチェキはありません
            </Box>
          </Box>
        ) : (
          <ContentGrid>
            {chekiCounts.map((chekiCount, id) => (
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
                <BottomAlignText size="xs" direction="horizontal">
                  <Box fontSize="display-l" textAlign="center">
                    {chekiCount.chekiCount.toLocaleString('ja-JP')}
                  </Box>
                  <Box fontSize="heading-xl">枚</Box>
                </BottomAlignText>
              </IdolChekiCount>
            ))}
          </ContentGrid>
        )}
      </Container>
      <Container header={<Header variant="h2">今月のチェキ統計</Header>}>
        <ChekiByIdolAnalytics chekiCounts={chekiCounts} />
      </Container>
    </SpaceBetween>
  )
}
